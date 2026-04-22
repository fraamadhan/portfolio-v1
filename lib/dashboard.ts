import { unstable_noStore as noStore } from "next/cache";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const GITHUB_USERNAME = "fraamadhan";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_PROFILE_CONTRIBUTIONS_ENDPOINT = `https://github.com/users/${GITHUB_USERNAME}/contributions`;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const LOCAL_VISITOR_COUNTER_FILE = path.join(
  process.cwd(),
  ".cache",
  "dashboard-visitors.json",
);

export type ContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
};

type GitHubGraphQLContributionDay = {
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
  date: string;
  weekday: number;
};

type GitHubGraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: GitHubGraphQLContributionDay[];
          }>;
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

type CounterApiResponse = {
  data?: {
    count?: number;
    name?: string;
  };
  count?: number;
  value?: number;
  name?: string;
};

class CounterApiHttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`CounterAPI request failed with status ${status}`);
    this.status = status;
  }
}

function normalizeDate(date: Date) {
  const nextDate = new Date(date);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function parseGitHubLevel(level: string | null | undefined): ContributionDay["level"] {
  if (level === "FOURTH_QUARTILE" || level === "4") return 4;
  if (level === "THIRD_QUARTILE" || level === "3") return 3;
  if (level === "SECOND_QUARTILE" || level === "2") return 2;
  if (level === "FIRST_QUARTILE" || level === "1") return 1;
  return 0;
}

async function ensureLocalVisitorCounterFile() {
  await mkdir(path.dirname(LOCAL_VISITOR_COUNTER_FILE), { recursive: true });

  try {
    await readFile(LOCAL_VISITOR_COUNTER_FILE, "utf8");
  } catch {
    await writeFile(
      LOCAL_VISITOR_COUNTER_FILE,
      JSON.stringify({ count: 0 }, null, 2),
      "utf8",
    );
  }
}

async function readLocalVisitorCount() {
  await ensureLocalVisitorCounterFile();

  try {
    const rawContent = await readFile(LOCAL_VISITOR_COUNTER_FILE, "utf8");
    const payload = JSON.parse(rawContent) as { count?: number };

    return typeof payload.count === "number" && Number.isFinite(payload.count)
      ? payload.count
      : 0;
  } catch (error) {
    console.error("Failed to read local visitor count:", error);
    return 0;
  }
}

async function writeLocalVisitorCount(count: number) {
  await ensureLocalVisitorCounterFile();
  await writeFile(
    LOCAL_VISITOR_COUNTER_FILE,
    JSON.stringify({ count }, null, 2),
    "utf8",
  );
}

function getCounterApiConfig() {
  const endpoint = process.env.COUNTER_API_ENDPOINT;
  const token = process.env.COUNTER_API_TOKEN;

  if (!endpoint || !token) {
    return null;
  }

  return {
    endpoint: endpoint.replace(/\/+$/, ""),
    token,
  };
}

function parseCounterApiCount(payload: CounterApiResponse | null) {
  const rawCount = payload?.data?.count ?? payload?.data?.value ?? payload?.count ?? payload?.value;

  return typeof rawCount === "number" && Number.isFinite(rawCount) ? rawCount : null;
}

async function fetchCounterApi(pathname = "") {
  const config = getCounterApiConfig();
  if (!config) {
    return null;
  }

  const response = await fetch(`${config.endpoint}${pathname}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new CounterApiHttpError(response.status);
  }

  return (await response.json()) as CounterApiResponse;
}

function buildWeeksFromDays(days: ContributionDay[]) {
  if (days.length === 0) {
    return [];
  }

  const dayMap = new Map(days.map((day) => [day.date, day]));
  const sortedDates = days.map((day) => normalizeDate(new Date(day.date))).sort((a, b) => a.getTime() - b.getTime());
  const startDate = sortedDates[0];
  const endDate = sortedDates[sortedDates.length - 1];
  const firstWeekStart = addDays(startDate, -startDate.getDay());
  const lastWeekEnd = addDays(endDate, 6 - endDate.getDay());
  const totalDays = Math.round((lastWeekEnd.getTime() - firstWeekStart.getTime()) / MS_PER_DAY) + 1;
  const paddedDays = Array.from({ length: totalDays }, (_, index) => {
    const date = addDays(firstWeekStart, index);
    const dateKey = date.toISOString().slice(0, 10);

    return (
      dayMap.get(dateKey) ?? {
        count: 0,
        date: dateKey,
        level: 0,
      }
    );
  });

  return Array.from({ length: Math.ceil(paddedDays.length / 7) }, (_, weekIndex) =>
    paddedDays.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
}

async function fetchGitHubContributionsFromGraphQL(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query DashboardContributions($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                contributionLevel
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: GITHUB_USERNAME,
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as GitHubGraphQLResponse;
    if (payload.errors?.length) {
      return null;
    }

    const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return null;
    }

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          count: day.contributionCount,
          date: day.date,
          level: parseGitHubLevel(day.contributionLevel),
        })),
      ),
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions via GraphQL:", error);
    return null;
  }
}

async function fetchGitHubContributionsFromProfile(): Promise<ContributionCalendar | null> {
  try {
    const response = await fetch(GITHUB_PROFILE_CONTRIBUTIONS_ENDPOINT, {
      headers: {
        "User-Agent": "portfolio-dashboard",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const svg = await response.text();
    const rects = svg.match(/<rect\b[^>]*>/g) ?? [];
    const days = rects
      .map((rect) => {
        const date = rect.match(/data-date="([^"]+)"/)?.[1];
        const countValue = rect.match(/data-count="(\d+)"/)?.[1];
        const levelValue = rect.match(/data-level="([^"]+)"/)?.[1];

        if (!date || !countValue) {
          return null;
        }

        return {
          count: Number.parseInt(countValue, 10),
          date,
          level: parseGitHubLevel(levelValue),
        } satisfies ContributionDay;
      })
      .filter((day): day is ContributionDay => day !== null);

    if (days.length === 0) {
      return null;
    }

    return {
      totalContributions: days.reduce((total, day) => total + day.count, 0),
      weeks: buildWeeksFromDays(days),
    };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions from profile page:", error);
    return null;
  }
}

export async function getGitHubContributionCalendar(): Promise<ContributionCalendar> {
  const graphQLCalendar = await fetchGitHubContributionsFromGraphQL();
  if (graphQLCalendar) {
    return graphQLCalendar;
  }

  const profileCalendar = await fetchGitHubContributionsFromProfile();
  if (profileCalendar) {
    return profileCalendar;
  }

  return {
    totalContributions: 0,
    weeks: [],
  };
}

export async function getVisitorCount() {
  noStore();

  try {
    const config = getCounterApiConfig();
    if (config) {
      const payload = await fetchCounterApi();
      const count = parseCounterApiCount(payload);

      if (count !== null) {
        return count;
      }
    }
  } catch (error) {
    if (error instanceof CounterApiHttpError && error.status === 404) {
      return 0;
    }

    console.error("Failed to fetch CounterAPI visitor count:", error);
  }

  return readLocalVisitorCount();
}

export async function incrementVisitorCount() {
  noStore();

  try {
    const config = getCounterApiConfig();
    if (config) {
      const payload = await fetchCounterApi("/up");
      const count = parseCounterApiCount(payload);

      if (count !== null) {
        return count;
      }
    }
  } catch (error) {
    console.error("Failed to increment CounterAPI visitor count:", error);
  }

  try {
    const currentCount = await readLocalVisitorCount();
    const nextCount = currentCount + 1;
    await writeLocalVisitorCount(nextCount);

    return nextCount;
  } catch (error) {
    console.error("Failed to increment visitor count:", error);
    return getVisitorCount();
  }
}

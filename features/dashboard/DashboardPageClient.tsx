"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Activity,
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

import { experiences, project } from "@/data/dummy";
import {
  EMAIL_ADDRESS,
  EMAIL_MAILTO_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/features/about-me/function";
import { useTranslation } from "@/hooks/useTranslation";
import { currentWorkRoleFormatted } from "@/lib";
import type { ContributionCalendar } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

const VISIBLE_DAY_LABELS = new Set([1, 3, 5]);
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short" });
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

type DashboardPageClientProps = {
  contributionCalendar: ContributionCalendar;
  visitorCount: number;
};

type StatCardProps = {
  description: string;
  icon: ComponentType<{ className?: string }>;
  liveLabel: string;
  title: string;
  value: number;
};

function getMonthLabels(weeks: ContributionCalendar["weeks"]) {
  let previousMonth = -1;

  return weeks.map((week, weekIndex) => {
    const firstVisibleDay = week.find((day) => day.count > 0 || weekIndex === 0);
    const labelCandidate =
      week.find((day) => new Date(day.date).getDate() === 1) ??
      (weekIndex === 0 ? firstVisibleDay : undefined);

    if (!labelCandidate) return "";

    const month = new Date(labelCandidate.date).getMonth();
    if (month === previousMonth) return "";

    previousMonth = month;
    return MONTH_FORMATTER.format(new Date(labelCandidate.date));
  });
}

function getTotalExperienceMonths() {
  return experiences.reduce((total, experience) => {
    const start = new Date(experience.startDate);
    const end = experience.isCurrent ? new Date() : new Date(experience.endDate);
    const monthDiff =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;

    return total + Math.max(monthDiff, 1);
  }, 0);
}

function useAnimatedNumber(target: number, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [duration, target]);

  return value;
}

function StatCard({ description, icon: Icon, liveLabel, title, value }: StatCardProps) {
  const animatedValue = useAnimatedNumber(value);

  return (
    <article className="group rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-5 shadow-[0_22px_50px_rgba(4,10,18,0.18)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[#9FC4FF]/20 bg-[#7AA7DD]/10 p-2 text-[#D9E9FF]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.28em] text-primary-100/60">
          {liveLabel}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-primary-100/65">{title}</p>
        <p className="font-sub-heading text-4xl tracking-wide text-white sm:text-5xl">
          {NUMBER_FORMATTER.format(animatedValue)}
        </p>
        <p className="text-sm leading-6 text-primary-100/78">{description}</p>
      </div>
    </article>
  );
}

export default function DashboardPageClient({
  contributionCalendar,
  visitorCount,
}: DashboardPageClientProps) {
  const { t } = useTranslation();
  const [liveVisitorCount, setLiveVisitorCount] = useState(visitorCount);
  const totalExperienceMonths = useMemo(() => getTotalExperienceMonths(), []);
  const totalProjectsWorked = useMemo(() => project.length + experiences.length, []);
  const monthLabels = useMemo(
    () => getMonthLabels(contributionCalendar.weeks),
    [contributionCalendar.weeks],
  );
  const dayLabels = useMemo(
    () => [
      t("dashboard.days.sun") ?? "Sun",
      t("dashboard.days.mon") ?? "Mon",
      t("dashboard.days.tue") ?? "Tue",
      t("dashboard.days.wed") ?? "Wed",
      t("dashboard.days.thu") ?? "Thu",
      t("dashboard.days.fri") ?? "Fri",
      t("dashboard.days.sat") ?? "Sat",
    ],
    [t],
  );

  useEffect(() => {
    const controller = new AbortController();

    const syncVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitors", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { count?: number };
        if (typeof payload.count === "number") {
          setLiveVisitorCount(payload.count);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Failed to sync visitor count:", error);
        }
      }
    };

    const handleVisitorUpdated = (event: Event) => {
      const count = (event as CustomEvent<{ count?: number }>).detail?.count;

      if (typeof count === "number") {
        setLiveVisitorCount(count);
      }
    };

    void syncVisitorCount();
    window.addEventListener("portfolio-visitor-updated", handleVisitorUpdated);

    return () => {
      controller.abort();
      window.removeEventListener("portfolio-visitor-updated", handleVisitorUpdated);
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.24),transparent_30%),linear-gradient(180deg,#324252_0%,#263544_42%,#1A2330_100%)] px-4 pb-24 pt-32 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.28),transparent_62%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <article className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] p-6 shadow-[0_28px_70px_rgba(4,10,18,0.22)] backdrop-blur-md sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 shadow-[0_14px_32px_rgba(4,10,18,0.24)] sm:h-28 sm:w-28">
                <Image
                  src="/img/me.jpeg"
                  alt="Fakhri Fajar Ramadhan portrait"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.34em] text-primary-100/70">
                    {t("dashboard.eyebrow")}
                  </p>
                  <h1 className="font-sub-heading text-3xl tracking-wide text-gradient-primary sm:text-4xl">
                    Fakhri Fajar Ramadhan
                  </h1>
                  <p className="text-base text-primary-100/86 sm:text-lg">
                    {currentWorkRoleFormatted()}
                  </p>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-primary-100/78 sm:text-base">
                  {t("dashboard.description")}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-primary-100/82">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
                    <MapPin className="h-4 w-4" />
                    {t("dashboard.location_badge")}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2">
                    <Activity className="h-4 w-4" />
                    {t("dashboard.live_data_badge")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/dashboard#contact"
                    scroll={true}
                    className="inline-flex items-center gap-2 rounded-full border border-[#90B9F1]/25 bg-[linear-gradient(135deg,rgba(127,166,206,0.24),rgba(83,135,210,0.16))] px-4 py-2 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t("dashboard.collaborate_button")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#90B9F1]/25 bg-[#6F9ED6]/12 px-4 py-2 text-sm text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t("dashboard.github_button")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-sm text-primary-100 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {t("dashboard.linkedin_button")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <StatCard
              title={t("dashboard.cards.website_visitors") ?? "Website Visitors"}
              value={liveVisitorCount}
              description={
                t("dashboard.cards.website_visitors_description") ??
                "Tracked once per browser session and synced with the live counter."
              }
              icon={Users}
              liveLabel={t("dashboard.cards.live") ?? "Live"}
            />
            <StatCard
              title={t("dashboard.cards.projects_worked_on") ?? "Projects Worked On"}
              value={totalProjectsWorked}
              description={
                t("dashboard.cards.projects_worked_on_description") ??
                "Featured builds and product engagements tracked in the portfolio."
              }
              icon={FolderKanban}
              liveLabel={t("dashboard.cards.live") ?? "Live"}
            />
            <StatCard
              title={t("dashboard.cards.work_experience") ?? "Work Experience"}
              value={experiences.length}
              description={`${totalExperienceMonths} ${
                t("dashboard.cards.work_experience_description") ??
                "total months across internship and freelance roles."
              }`}
              icon={BriefcaseBusiness}
              liveLabel={t("dashboard.cards.live") ?? "Live"}
            />
          </div>
        </div>

        <article className="rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,20,34,0.92),rgba(12,24,40,0.86))] p-5 shadow-[0_28px_70px_rgba(4,10,18,0.22)] backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 className="font-sub-heading text-2xl tracking-wide text-white sm:text-3xl">
                {NUMBER_FORMATTER.format(contributionCalendar.totalContributions)}{" "}
                {t("dashboard.contributions.label")}
              </h2>
              <p className="text-sm leading-6 text-primary-100/70">
                {t("dashboard.contributions.description")}
              </p>
            </div>

            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#90B9F1]/18 bg-[#6F9ED6]/10 px-4 py-2 text-sm text-primary-100 transition-colors duration-300 hover:border-[#90B9F1]/28 hover:text-white"
            >
              {t("dashboard.contributions.view_github")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {contributionCalendar.weeks.length > 0 ? (
            <div className="overflow-x-auto overflow-y-hidden pt-5">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
                  <div />
                  <div
                    className="grid gap-1 text-xs text-primary-100/68"
                    style={{
                      gridTemplateColumns: `repeat(${contributionCalendar.weeks.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {monthLabels.map((label, index) => (
                      <span
                        key={`month-${index}`}
                        className="overflow-visible whitespace-nowrap text-xs"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-rows-7 gap-1 pr-2 text-xs text-primary-100/68">
                    {dayLabels.map((day, index) => (
                      <span key={day} className="flex h-4 items-center">
                        {VISIBLE_DAY_LABELS.has(index) ? day : ""}
                      </span>
                    ))}
                  </div>

                  <div
                    className="grid gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${contributionCalendar.weeks.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {contributionCalendar.weeks.map((week, weekIndex) => (
                      <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            title={`${NUMBER_FORMATTER.format(day.count)} ${t("dashboard.contributions.label")} on ${new Date(day.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}`}
                            className={cn(
                              "h-4 w-4 rounded-[4px] border border-white/6 transition-colors duration-200",
                              day.level === 0 && "bg-[#142132]",
                              day.level === 1 && "bg-[#183B66]",
                              day.level === 2 && "bg-[#255A96]",
                              day.level === 3 && "bg-[#3D7FCC]",
                              day.level === 4 && "bg-[#76B1FF]",
                            )}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 text-sm text-primary-100/68">
                  <p>{t("dashboard.contributions.activity_over_last_year")}</p>

                  <div className="flex items-center gap-2">
                    <span>{t("dashboard.contributions.less")}</span>
                    <div className="flex items-center gap-1">
                      {["#142132", "#183B66", "#255A96", "#3D7FCC", "#76B1FF"].map((color) => (
                        <span
                          key={color}
                          className="h-3.5 w-3.5 rounded-[4px] border border-white/6"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span>{t("dashboard.contributions.more")}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-5 text-sm leading-6 text-primary-100/70">
              {t("dashboard.contributions.unavailable")}
            </div>
          )}
        </article>

        <section
          id="contact"
          className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(127,166,206,0.2),transparent_38%),linear-gradient(135deg,rgba(9,18,31,0.98),rgba(15,28,44,0.92))] px-6 py-12 shadow-[0_28px_70px_rgba(4,10,18,0.24)] sm:px-8 sm:py-14"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(83,135,210,0.18),transparent_58%)]" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
            <p className="text-sm uppercase tracking-[0.34em] text-primary-100/68">
              {t("dashboard.contact.eyebrow")}
            </p>

            <div className="space-y-4">
              <h2 className="font-sub-heading text-4xl leading-none tracking-tight text-gradient-primary sm:text-6xl p-2">
                {t("dashboard.contact.title")}
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-primary-100/76 sm:text-lg">
                {t("dashboard.contact.description")}
              </p>
            </div>

            <div className="w-full max-w-2xl rounded-[1.5rem] border border-white/12 bg-white/[0.05] p-3 shadow-[0_20px_45px_rgba(4,10,18,0.18)] backdrop-blur-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-[0.26em] text-primary-100/56">
                    {t("dashboard.contact.email_label")}
                  </p>
                  <p className="mt-2 text-lg font-medium text-white sm:text-xl">
                    {EMAIL_ADDRESS}
                  </p>
                </div>

                <Link
                  href={EMAIL_MAILTO_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-[1.1rem] bg-[linear-gradient(135deg,#77AFFF,#4E7FCD)] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_35px_rgba(78,127,205,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  {t("dashboard.contact.email_action")}
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={EMAIL_MAILTO_URL}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-primary-100 transition-transform duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {t("dashboard.contact.direct_mail")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-primary-100 transition-transform duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                {t("dashboard.contact.github_action")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-primary-100 transition-transform duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                {t("dashboard.contact.linkedin_action")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

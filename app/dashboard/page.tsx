import DashboardPageClient from "@/features/dashboard/DashboardPageClient";
import {
  getGitHubContributionCalendar,
  getVisitorCount,
} from "@/lib/dashboard";

export default async function DashboardPage() {
  const [contributionCalendar, visitorCount] = await Promise.all([
    getGitHubContributionCalendar(),
    getVisitorCount(),
  ]);

  return (
    <DashboardPageClient
      contributionCalendar={contributionCalendar}
      visitorCount={visitorCount}
    />
  );
}

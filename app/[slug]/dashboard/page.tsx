import DashboardPageClient from "@/features/dashboard/DashboardPageClient";
import {
  getGitHubContributionCalendar,
  getVisitorCount,
} from "@/lib/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientRedirect from "@/components/ClientRedirect";

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DashboardPage({ params }: PageProps) {
  const { slug } = await params;

  // Restrict slug to fakhri-fajar-ramadhan only
  if (slug !== "fakhri-fajar-ramadhan") {
    return <ClientRedirect to={`/${slug}`} />;
  }

  // Restrict to logged-in user with email fakhrifajarrr@gmail.com
  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== "fakhrifajarrr@gmail.com") {
    return <ClientRedirect to="/cms/gateway" />;
  }

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

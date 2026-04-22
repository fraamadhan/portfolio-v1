"use client";

import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, FolderKanban, Users } from "lucide-react";

import { experiences, project } from "@/data/dummy";
import DashboardContactSection from "@/features/dashboard/components/DashboardContactSection";
import DashboardContributionCard from "@/features/dashboard/components/DashboardContributionCard";
import DashboardHeroCard from "@/features/dashboard/components/DashboardHeroCard";
import StatCard from "@/features/dashboard/components/StatCard";
import {
  getMonthLabels,
  getTotalExperienceMonths,
} from "@/features/dashboard/function";
import { useTranslation } from "@/hooks/useTranslation";
import type { ContributionCalendar } from "@/lib/dashboard";
import { scrollToElementWithOffset } from "@/lib/utils";

type DashboardPageClientProps = {
  contributionCalendar: ContributionCalendar;
  visitorCount: number;
};

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

  useEffect(() => {
    if (window.location.hash !== "#contact") return;

    const frame = window.requestAnimationFrame(() => {
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        scrollToElementWithOffset(contactSection, { behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.24),transparent_30%),linear-gradient(180deg,#f7fbff_0%,#e8f0f8_42%,#dce6f0_100%)] px-4 pb-24 pt-32 sm:px-6 dark:bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.24),transparent_30%),linear-gradient(180deg,#324252_0%,#263544_42%,#1A2330_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(71,85,105,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(71,85,105,0.04)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.28),transparent_62%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
          <DashboardHeroCard />

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
              description={`${totalExperienceMonths} ${t("dashboard.cards.work_experience_description") ??
                "total months across internship and freelance roles."
                }`}
              icon={BriefcaseBusiness}
              liveLabel={t("dashboard.cards.live") ?? "Live"}
            />
          </div>
        </div>

        <DashboardContributionCard
          contributionCalendar={contributionCalendar}
          dayLabels={dayLabels}
          monthLabels={monthLabels}
        />

        <DashboardContactSection />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GITHUB_URL } from "@/features/about-me/function";
import {
  NUMBER_FORMATTER,
  VISIBLE_DAY_LABELS,
} from "@/features/dashboard/function";
import { useTranslation } from "@/hooks/useTranslation";
import type { ContributionCalendar } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

type DashboardContributionCardProps = {
  contributionCalendar: ContributionCalendar;
  dayLabels: string[];
  monthLabels: string[];
};

export default function DashboardContributionCard({
  contributionCalendar,
  dayLabels,
  monthLabels,
}: DashboardContributionCardProps) {
  const { t } = useTranslation();

  return (
    <article className="rounded-[2rem] border border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(234,242,251,0.94))] p-5 shadow-[0_28px_70px_rgba(148,163,184,0.18)] backdrop-blur-md sm:p-6 dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(10,20,34,0.92),rgba(12,24,40,0.86))] dark:shadow-[0_28px_70px_rgba(4,10,18,0.22)]">
      <div className="flex flex-col gap-3 border-b border-slate-300/70 pb-5 sm:flex-row sm:items-start sm:justify-between dark:border-white/8">
        <div className="space-y-1">
          <h2 className="font-sub-heading text-2xl tracking-wide text-neutral-100 sm:text-3xl">
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
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#90B9F1]/18 bg-[#6F9ED6]/10 px-4 py-2 text-sm text-primary-100 transition-colors duration-300 hover:border-[#90B9F1]/28 hover:text-slate-900 dark:hover:text-white"
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
  );
}

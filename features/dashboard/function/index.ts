import { useEffect, useState } from "react";

import { experiences } from "@/data/dummy";
import type { ContributionCalendar } from "@/lib/dashboard";

export const VISIBLE_DAY_LABELS = new Set([1, 3, 5]);
export const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short" });

export function getMonthLabels(weeks: ContributionCalendar["weeks"]) {
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

export function getTotalExperienceMonths() {
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

export function useAnimatedNumber(target: number, duration = 1400) {
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

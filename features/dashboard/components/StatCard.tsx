"use client";

import type { ComponentType } from "react";

import { NUMBER_FORMATTER, useAnimatedNumber } from "@/features/dashboard/function";

type StatCardProps = {
  description: string;
  icon: ComponentType<{ className?: string }>;
  liveLabel: string;
  title: string;
  value: number;
};

export default function StatCard({
  description,
  icon: Icon,
  liveLabel,
  title,
  value,
}: StatCardProps) {
  const animatedValue = useAnimatedNumber(value);

  return (
    <article className="group rounded-[1.75rem] border border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(235,242,251,0.9))] p-5 shadow-[0_22px_50px_rgba(148,163,184,0.16)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] dark:shadow-[0_22px_50px_rgba(4,10,18,0.18)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-[#9FC4FF]/35 bg-[#DCEAFE] p-2 text-[#5D87C9] dark:border-[#9FC4FF]/20 dark:bg-[#7AA7DD]/10 dark:text-[#D9E9FF]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.28em] text-primary-100/60">
          {liveLabel}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-primary-100/65">{title}</p>
        <p className="font-sub-heading text-4xl tracking-wide text-neutral-100 sm:text-5xl">
          {NUMBER_FORMATTER.format(animatedValue)}
        </p>
        <p className="text-sm leading-6 text-primary-100/78">{description}</p>
      </div>
    </article>
  );
}

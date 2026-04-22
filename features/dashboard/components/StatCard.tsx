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

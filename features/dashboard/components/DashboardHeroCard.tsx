"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { Activity, ArrowUpRight, MapPin } from "lucide-react";

import {
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/features/about-me/function";
import { useTranslation } from "@/hooks/useTranslation";
import { currentWorkRoleFormatted } from "@/lib";
import { scrollToElementWithOffset } from "@/lib/utils";

export default function DashboardHeroCard() {
  const { t } = useTranslation();

  const handleContactScroll = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      scrollToElementWithOffset(contactSection);
      window.history.replaceState(null, "", "/dashboard#contact");
      return;
    }

    window.location.href = "/dashboard#contact";
  };

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-300/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(234,242,251,0.9))] p-6 shadow-[0_28px_70px_rgba(148,163,184,0.18)] backdrop-blur-md sm:p-8 dark:border-white/12 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] dark:shadow-[0_28px_70px_rgba(4,10,18,0.22)]">
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
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/75 px-4 py-2 dark:border-white/12 dark:bg-white/[0.07]">
              <MapPin className="h-4 w-4" />
              {t("dashboard.location_badge")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/75 px-4 py-2 dark:border-white/12 dark:bg-white/[0.07]">
              <Activity className="h-4 w-4" />
              {t("dashboard.live_data_badge")}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/dashboard#contact"
              scroll={false}
              onClick={handleContactScroll}
              className="inline-flex items-center gap-2 rounded-full border border-[#90B9F1]/25 bg-[linear-gradient(135deg,rgba(127,166,206,0.24),rgba(83,135,210,0.16))] px-4 py-2 text-sm text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 dark:text-white"
            >
              {t("dashboard.collaborate_button")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#90B9F1]/25 bg-[#6F9ED6]/12 px-4 py-2 text-sm text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 dark:text-white"
            >
              {t("dashboard.github_button")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm text-primary-100 transition-transform duration-300 hover:-translate-y-0.5 dark:border-white/12 dark:bg-white/[0.07]"
            >
              {t("dashboard.linkedin_button")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

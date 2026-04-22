"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import {
  EMAIL_ADDRESS,
  EMAIL_MAILTO_URL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/features/about-me/function";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="relative scroll-mt-32 overflow-hidden rounded-[2rem] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(127,166,206,0.2),transparent_38%),linear-gradient(135deg,rgba(9,18,31,0.98),rgba(15,28,44,0.92))] px-6 py-12 shadow-[0_28px_70px_rgba(4,10,18,0.24)] sm:px-8 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(83,135,210,0.18),transparent_58%)]" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <p className="text-sm uppercase tracking-[0.34em] text-primary-100/68">
          {t("dashboard.contact.eyebrow")}
        </p>

        <div className="space-y-4">
          <h2 className="font-sub-heading p-2 text-4xl leading-none tracking-tight text-gradient-primary sm:text-6xl">
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
  );
}

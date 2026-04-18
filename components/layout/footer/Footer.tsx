"use client";

import Link from "next/link";

import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
} from "@/features/about-me/function";
import { currentWorkRoleFormatted } from "@/lib/helper";
import { useTranslation } from "@/hooks/useTranslation";
import { HOME_HREF, NAV_ITEMS } from "../navbar/navConfig";
import Image from "next/image";

const GENERAL_LINKS = [
  { href: HOME_HREF, labelKey: "footer.general.home" },
  ...NAV_ITEMS.map((item) => ({
    href: item.href,
    labelKey: item.labelKey,
  })),
];

const COLLECTION_LINKS = [
  { href: "/collection/book", labelKey: "footer.collection.book" },
  { href: "/collection/manwha", labelKey: "footer.collection.manwha" },
  { href: "/collection/manga", labelKey: "footer.collection.manga" },
  { href: "/collection/music", labelKey: "footer.collection.music" },
];

const RESOURCE_LINKS = [
  { href: EMAIL, labelKey: "footer.resources.gmail" },
  { href: GITHUB_URL, labelKey: "footer.resources.github" },
  { href: LINKEDIN_URL, labelKey: "footer.resources.linkedin" },
];

const SOCIAL_LINKS = [
  {
    href: EMAIL,
    label: "Email",
    icon: "/logo/ic_email.svg",
  },
  {
    href: GITHUB_URL,
    label: "GitHub",
    icon: "/logo/ic_github.svg",
  },
  {
    href: LINKEDIN_URL,
    label: "LinkedIn",
    icon: "/logo/ic_linkedin.svg",
  },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-primary-200/20 bg-[linear-gradient(to_right,#3A4E63_22%,#1E2A38_100%)] px-6 py-16 text-white md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[1.25fr_repeat(3,minmax(0,1fr))] md:gap-12">
          <div className="space-y-5">
            <div className="space-y-3">
              <h2 className="font-sub-heading text-4xl leading-none tracking-wide text-white">
                Fakhri Fajar R.
              </h2>
              <p className="max-w-sm text-base leading-7 text-primary-100/75">
                {currentWorkRoleFormatted()}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-primary-100/85 transition hover:-translate-y-0.5 hover:border-primary-100/45 hover:text-white"
                >
                  <Image
                    src={icon}
                    alt={label}
                    width={40}
                    height={40}
                    className="h-5 w-5 object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.24)]"
                  />

                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.28em] text-primary-100/70">
              {t("footer.general.title")}
            </h3>
            <ul className="space-y-3">
              {GENERAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-white/88 transition hover:text-primary-100"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.28em] text-primary-100/70">
              {t("footer.collection.title")}
            </h3>
            <ul className="space-y-3">
              {COLLECTION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg text-white/88 transition hover:text-primary-100"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.28em] text-primary-100/70">
              {t("footer.resources.title")}
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg text-white/88 transition hover:text-primary-100"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-200/15 pt-8 text-center">
          <p className="text-sm text-primary-100/65">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

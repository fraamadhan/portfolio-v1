"use client";

import Image from "next/image";

import { useTranslation } from "@/hooks/useTranslation";

const UnderConstructionView = () => {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[calc(100svh-5rem)] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(127,166,206,0.16),transparent_30%),linear-gradient(180deg,#122132_0%,#09131d_58%,#04080d_100%)] px-6 py-28 text-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative h-48 w-48 sm:h-56 sm:w-56">
          <Image
            src="/illustration/under-development.svg"
            alt="Under development"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="mt-8 space-y-3">
          <h1 className="font-sub-heading text-4xl tracking-wide text-gradient-skills sm:text-5xl p-2">
            {t("under_construction.title")}
          </h1>
          <p className="mx-auto max-w-xl text-base leading-8 text-primary-100/80 sm:text-lg">
            {t("under_construction.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnderConstructionView;

"use client"

import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation"
import { Card } from "./components/Card";
import Link from "next/link";

const experienceCards = [
    { id: "telkom-backend-1" },
    { id: "telkom-backend-2" },
    { id: "telkom-backend-3" },
    { id: "telkom-backend-4" },
]

const ExperienceSection = () => {
    const { t } = useTranslation();
    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="flex w-full min-h-[calc(85svh-5rem)] flex-col items-center justify-start gap-y-10 bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.18),transparent_38%),linear-gradient(180deg,var(--color-neutral-600),var(--color-neutral-700))] px-4 py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:px-6 md:pb-12"
        >
            <h2
                id="experience-heading"
                className="
                    font-sub-heading text-4xl text-center tracking-wide
                    text-gradient-primary font-bold w-fit
                "
            >
                {t("experience_section.experience_journey")}
            </h2>
            <p className="max-w-3xl rounded-2xl border border-white/12 bg-white/6 px-6 py-4 text-center text-sm leading-7 text-neutral-200 shadow-[0_18px_45px_rgba(4,10,18,0.22)] backdrop-blur-sm sm:text-base">
                {t("experience_section.description")}
            </p>

            <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-4 md:grid-cols-2">
                {experienceCards.map((card) => (
                    <Card key={card.id} cardId={card.id} />
                ))}
            </div>

            <Link
                href="/experience"
                className="flex w-fit items-center gap-2 self-center rounded-xl border border-white/12 bg-white/6 px-4 py-3 text-sm tracking-wide text-neutral-100 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
            >
                <span>{t("experience_section.see_more")}</span>
                <Image src="/logo/ic_arrow_right.svg" alt="" width={16} height={16} className="h-4 w-4 shrink-0" />
            </Link>
        </section>
    )
}

export default ExperienceSection

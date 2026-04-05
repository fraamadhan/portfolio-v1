"use client"

import { backendItems, devOpsItems, frontendItems } from "@/data/dummy"
import Card from "./components/Card"
import { useTranslation } from "@/hooks/useTranslation"

const SkillSection = () => {
    const { t } = useTranslation();
    return (
        <section
            id="skills"
            aria-labelledby="skills-section"
            className="flex w-full min-h-[calc(85svh-5rem)] flex-col items-center justify-start gap-y-10 bg-neutral-700 px-4 py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:pb-10"
        >
            <h2
                id="skills-heading"
                className="
                    font-sub-heading text-4xl text-center tracking-wide
                    text-gradient-skills font-bold w-fit
                "
            >
                {t("skills_section.expertise_tech_stack")}
            </h2>
            <p className="max-w-3xl rounded-2xl border border-white/12 bg-white/6 px-6 py-4 text-center text-sm leading-7 text-neutral-200 shadow-[0_18px_45px_rgba(4,10,18,0.22)] backdrop-blur-sm sm:text-base">
                {t("skills_section.description")}
            </p>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <Card
                    title={t(backendItems.titleKey) ?? ""}
                    description={t(backendItems.descriptionKey) ?? ""}
                    items={backendItems.items}
                />
                <Card
                    title={t(frontendItems.titleKey) ?? ""}
                    description={t(frontendItems.descriptionKey) ?? ""}
                    items={frontendItems.items}
                />
                <Card
                    title={t(devOpsItems.titleKey) ?? ""}
                    description={t(devOpsItems.descriptionKey) ?? ""}
                    items={devOpsItems.items}
                />
            </div>
        </section>
    )
}

export default SkillSection

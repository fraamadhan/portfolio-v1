import { Building2, CalendarDays, MapPin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useTranslation } from "@/hooks/useTranslation"
import type { ExperienceItemProps } from "@/types"
import { cn } from "@/lib/utils"
import { KeypointList } from "./KeypointList"

type CardItemProps = {
    experience: ExperienceItemProps
    isKeypointsOpen: boolean
    onToggleKeypoints: () => void
    keypointsContentId: string
    collapsibleKeypoints?: boolean
}

export const CardItem = ({
    experience,
    isKeypointsOpen,
    onToggleKeypoints,
    keypointsContentId,
    collapsibleKeypoints = true,
}: CardItemProps) => {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const formatter = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    })
    const formatDate = (value: string) => {
        if (!value) return ""
        const parts = value.split("-").map(Number)
        if (parts.some(isNaN) || parts.length < 2) return value
        const [year, month] = parts
        return formatter.format(new Date(Date.UTC(year, month - 1, 1)))
    }
    const startStr = formatDate(experience.startDate)
    const endStr = experience.isCurrent 
        ? (t("experience_section.current") || "Current") 
        : formatDate(experience.endDate)
    const dateRange = startStr && endStr ? `${startStr} - ${endStr}` : (startStr || endStr || "")

    return (
        <div className="flex max-w-xl flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
                <h4 className="font-sub-heading text-2xl font-bold tracking-wide text-gradient-skills">
                    {experience.role}
                </h4>
                <div className="flex flex-wrap justify-end gap-2 text-xs font-medium tracking-[0.18em] uppercase">
                    {experience.isCurrent ? (
                        <p className="rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-neutral-100">{t("experience_section.current")}</p>
                    ) : null}
                    <p className={cn(
                        "rounded-full px-3 py-1.5",
                        experience.category === "Freelance"
                            ? "border border-[#f0a68f]/40 bg-[#f0a68f]/15 text-[#ffd0c0]"
                            : "border border-primary-200/40 bg-primary-400/20 text-primary-100"
                    )}>
                        {experience.category}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-sm tracking-wide text-neutral-200 sm:text-base">
                <p className="flex items-center gap-2 leading-none">
                    <Building2 className="h-[18px] w-[18px] shrink-0 text-primary-100" />
                    <span>{experience.company}</span>
                </p>
                <p className="flex items-center gap-2 leading-none">
                    <MapPin className="h-[18px] w-[18px] shrink-0 text-primary-100" />
                    <span>{experience.location}</span>
                </p>
                <p className="flex items-center gap-2 leading-none">
                    <CalendarDays className="h-[18px] w-[18px] shrink-0 text-primary-100" />
                    <span>{dateRange}</span>
                </p>
            </div>
            <KeypointList
                keypoints={experience.keypoints}
                techStack={experience.techStack}
                isOpen={isKeypointsOpen}
                onToggle={onToggleKeypoints}
                contentId={keypointsContentId}
                collapsible={collapsibleKeypoints}
            />
        </div>
    )
}

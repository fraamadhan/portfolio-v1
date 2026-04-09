import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"
import { useTranslation } from "@/hooks/useTranslation"
import { KeypointList } from "./KeypointList"

type CardItemProps = {
    isKeypointsOpen: boolean
    onToggleKeypoints: () => void
    keypointsContentId: string
    collapsibleKeypoints?: boolean
}

export const CardItem = ({
    isKeypointsOpen,
    onToggleKeypoints,
    keypointsContentId,
    collapsibleKeypoints = true,
}: CardItemProps) => {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const isCurrent = true;
    const startDate = new Date("2025-11-01T00:00:00")
    const endDate = new Date("2026-05-01T00:00:00")
    const formatter = new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", {
        month: "long",
        year: "numeric",
    })
    const dateRange = `${formatter.format(startDate)} - ${formatter.format(endDate)}`

    return (
        <div className="flex max-w-xl flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
                <h4 className="font-sub-heading text-2xl tracking-wide
                    text-gradient-skills font-bold w-fit">{t("experience_section.cards.telkom_backend.title")}</h4>
                <div className="flex flex-wrap justify-end gap-2 text-xs font-medium tracking-[0.18em] uppercase">
                    <p className={`${isCurrent ? "block" : "hidden"} rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-neutral-100`}>{t("experience_section.current")}</p>
                    <p className="rounded-full border border-primary-200/40 bg-primary-400/20 px-3 py-1.5 text-primary-100">{t("experience_section.internship")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-sm tracking-wide text-neutral-200 sm:text-base">
                <p className="flex items-center gap-2 leading-none">
                    <Image src="/logo/ic_company.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                    <span>{t("experience_section.cards.telkom_backend.company")}</span>
                </p>
                <p className="flex items-center gap-2 leading-none">
                    <Image src="/logo/ic_location.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                    <span>{t("experience_section.cards.telkom_backend.location")}</span>
                </p>
                <p className="flex items-center gap-2 leading-none">
                    <Image src="/logo/ic_date.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                    <span>{dateRange}</span>
                </p>
            </div>
            <KeypointList
                isOpen={isKeypointsOpen}
                onToggle={onToggleKeypoints}
                contentId={keypointsContentId}
                collapsible={collapsibleKeypoints}
            />
        </div>
    )
}

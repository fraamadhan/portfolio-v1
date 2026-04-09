"use client"
import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils"
import { ExperienceTechStack } from "./ExperienceTechStack"

type KeypointListProps = {
    isOpen: boolean
    onToggle: () => void
    contentId: string
    collapsible?: boolean
}

export const KeypointList = ({ isOpen, onToggle, contentId, collapsible = true }: KeypointListProps) => {
    const { t } = useTranslation()
    const showContent = collapsible ? isOpen : true

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-neutral-200 uppercase">
                <Image src="/logo/ic_keypoints.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] shrink-0" />
                {collapsible ? (
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={onToggle}
                        className="flex w-full items-center justify-between gap-3 rounded-xl text-left transition-opacity hover:opacity-85"
                    >
                        <span>{t("experience_section.keypoints")}</span>
                        <Image
                            src={isOpen ? "/logo/ic_arrow_up.svg" : "/logo/ic_arrow_down.svg"}
                            alt=""
                            width={18}
                            height={18}
                            className="h-[18px] w-[18px] shrink-0"
                        />
                    </button>
                ) : (
                    <div className={cn("flex w-full items-center justify-between gap-3 rounded-xl text-left", "cursor-default")}>
                        <span>{t("experience_section.keypoints")}</span>
                    </div>
                )}
            </div>
            {showContent ? (
                <div id={contentId}>
                    <ul className="list-disc px-6 text-sm leading-6 text-neutral-100 sm:text-base">
                        <li>Developed APIs for analytics and Service Level Guarantee (SLG) features on the Telkom Test House website.</li>
                        <li>Maintained and enhanced existing APIs to ensure stability and performance.</li>
                        <li>Built endpoints to support re-verification of sample verification processes.</li>
                        <li>Implemented additional subflows for payment re-verification in the sample verification workflow.</li>
                    </ul>
                    <ExperienceTechStack />
                </div>
            ) : null}
        </div>
    )
}

"use client"

import { useState } from "react"
import type { ExperienceItemProps } from "@/types"
import { cn } from "@/lib/utils"
import { CardItem } from "./CardItem"

type CardProps = {
    experience: ExperienceItemProps
    className?: string
    defaultKeypointsOpen?: boolean
    collapsibleKeypoints?: boolean
}

export const Card = ({
    experience,
    className,
    defaultKeypointsOpen = false,
    collapsibleKeypoints = true,
}: CardProps) => {
    const [isKeypointsOpen, setIsKeypointsOpen] = useState(defaultKeypointsOpen)
    const keypointsContentId = `experience-keypoints-${experience.id}`

    return (
        <article className={cn(
            "h-fit self-start rounded-3xl border border-slate-300/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(235,242,251,0.92))] p-5 shadow-[0_20px_50px_rgba(148,163,184,0.16)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-slate-400/70 sm:p-6 dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-[0_20px_50px_rgba(4,10,18,0.2)] dark:hover:border-white/20",
            className
        )}>
            <CardItem
                experience={experience}
                isKeypointsOpen={isKeypointsOpen}
                onToggleKeypoints={() => setIsKeypointsOpen((prev) => !prev)}
                keypointsContentId={keypointsContentId}
                collapsibleKeypoints={collapsibleKeypoints}
            />
        </article>
    )
}

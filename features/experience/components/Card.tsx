"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CardItem } from "./CardItem"

type CardProps = {
    cardId: string
    className?: string
    defaultKeypointsOpen?: boolean
    collapsibleKeypoints?: boolean
}

export const Card = ({
    cardId,
    className,
    defaultKeypointsOpen = false,
    collapsibleKeypoints = true,
}: CardProps) => {
    const [isKeypointsOpen, setIsKeypointsOpen] = useState(defaultKeypointsOpen)
    const keypointsContentId = `experience-keypoints-${cardId}`

    return (
        <article className={cn(
            "h-fit self-start rounded-3xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_50px_rgba(4,10,18,0.2)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-6",
            className
        )}>
            <CardItem
                isKeypointsOpen={isKeypointsOpen}
                onToggleKeypoints={() => setIsKeypointsOpen((prev) => !prev)}
                keypointsContentId={keypointsContentId}
                collapsibleKeypoints={collapsibleKeypoints}
            />
        </article>
    )
}

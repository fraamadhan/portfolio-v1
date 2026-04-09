"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import { Card } from "./components/Card"
import { TimelineConnector } from "./components/TimelineConnector"
import { TimelinePlane } from "./components/TimelinePlane"
import { cn } from "@/lib/utils"

const timelineCards = [
    { id: "timeline-card-1", side: "left" as const },
    { id: "timeline-card-2", side: "right" as const },
    { id: "timeline-card-3", side: "left" as const },
    { id: "timeline-card-4", side: "right" as const },
]

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export default function ExperienceTimelinePage() {
    const { t } = useTranslation()
    const timelineRef = useRef<HTMLDivElement | null>(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        let frameId = 0

        const updateProgress = () => {
            const container = timelineRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const startOffset = viewportHeight * 0.2
            const travelDistance = rect.height - viewportHeight * 0.3
            const nextProgress = clamp((startOffset - rect.top) / Math.max(travelDistance, 1))

            setScrollProgress(nextProgress)
        }

        const requestUpdate = () => {
            cancelAnimationFrame(frameId)
            frameId = window.requestAnimationFrame(updateProgress)
        }

        requestUpdate()
        window.addEventListener("scroll", requestUpdate, { passive: true })
        window.addEventListener("resize", requestUpdate)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener("scroll", requestUpdate)
            window.removeEventListener("resize", requestUpdate)
        }
    }, [])

    return (
        <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.2),transparent_28%),linear-gradient(180deg,#334155_0%,#263240_42%,#1c2431_100%)] px-4 pb-24 pt-32 sm:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-25" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.28),transparent_62%)]" />

            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
                <Link
                    href="/#experience"
                    className="flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm tracking-wide text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/20"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{t("experience_section.experience_journey")}</span>
                </Link>

                <div className="max-w-3xl space-y-4">
                    <p className="font-sub-heading text-sm uppercase tracking-[0.35em] text-primary-100/80">
                        {t("experience_section.timeline_eyebrow")}
                    </p>
                    <h1 className="font-sub-heading text-3xl tracking-wide text-gradient-primary sm:text-4xl">
                        {t("experience_section.experience_journey")}
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-neutral-200 sm:text-lg">
                        {t("experience_section.description")}
                    </p>
                </div>

                <div ref={timelineRef} className="relative">
                    <TimelinePlane progress={scrollProgress} />

                    <div className="flex flex-col gap-14 sm:gap-[4.5rem] md:gap-24">
                        {timelineCards.map((card) => (
                            <div
                                key={card.id}
                                className="relative md:grid md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:items-start"
                            >
                                <div className="absolute left-6 top-16 h-px w-10 bg-[linear-gradient(90deg,rgba(127,166,206,0.85),rgba(255,255,255,0.14))] md:hidden" />
                                <div className="absolute left-6 top-[4.05rem] h-3 w-3 -translate-x-1/2 rounded-full border border-primary-100/55 bg-[radial-gradient(circle,var(--color-primary-100)_0%,rgba(127,166,206,0.55)_45%,rgba(30,42,56,0.9)_100%)] shadow-[0_0_22px_rgba(127,166,206,0.45)] md:hidden" />

                                <div
                                    className={cn(
                                        "pl-16 md:pl-0",
                                        card.side === "left"
                                            ? "md:col-start-1 md:justify-self-end md:pr-8"
                                            : "md:col-start-3 md:pl-8"
                                    )}
                                >
                                    <Card
                                        cardId={card.id}
                                        defaultKeypointsOpen
                                        collapsibleKeypoints={false}
                                        className="w-full max-w-xl border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] shadow-[0_24px_60px_rgba(4,10,18,0.22)]"
                                    />
                                </div>

                                <div className="md:col-start-2 md:row-start-1">
                                    <TimelineConnector side={card.side} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

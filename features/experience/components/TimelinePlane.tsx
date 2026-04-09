"use client"

import { Plane } from "lucide-react"

type TimelinePlaneProps = {
    progress: number
}

const clampProgress = (value: number) => Math.min(1, Math.max(0, value))

export const TimelinePlane = ({ progress }: TimelinePlaneProps) => {
    const safeProgress = clampProgress(progress)

    return (
        <div className="pointer-events-none absolute inset-y-0 left-6 z-10 md:left-1/2 md:-translate-x-1/2">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
            <div
                className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(127,166,206,0.18),rgba(127,166,206,0.92),rgba(245,247,250,0.9))]"
                style={{ height: `${Math.max(safeProgress * 100, 2)}%` }}
            />
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-[top] duration-150 ease-out"
                style={{ top: `calc(${safeProgress * 100}% - 1.375rem)` }}
            >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-100/45 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),rgba(127,166,206,0.25),rgba(30,42,56,0.96))] shadow-[0_16px_28px_rgba(4,10,18,0.34)] backdrop-blur-sm">
                    <Plane className="h-4 w-4 rotate-45 text-neutral-100" />
                </div>
            </div>
        </div>
    )
}

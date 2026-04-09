import { cn } from "@/lib/utils"

type TimelineConnectorProps = {
    side: "left" | "right"
}

export const TimelineConnector = ({ side }: TimelineConnectorProps) => {
    return (
        <div className="relative hidden h-full min-h-[18rem] md:block">
            <div className="absolute top-16 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-primary-100/55 bg-[radial-gradient(circle,var(--color-primary-100)_0%,rgba(127,166,206,0.55)_45%,rgba(30,42,56,0.9)_100%)] shadow-[0_0_22px_rgba(127,166,206,0.45)]" />
            <div
                className={cn(
                    "absolute top-[4.05rem] h-px bg-[linear-gradient(90deg,rgba(127,166,206,0.85),rgba(255,255,255,0.14))]",
                    side === "left" ? "right-1/2 w-14" : "left-1/2 w-14"
                )}
            />
        </div>
    )
}

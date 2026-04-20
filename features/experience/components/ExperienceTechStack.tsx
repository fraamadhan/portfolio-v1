import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation"
import type { ExperienceTechStackItemProps } from "@/types"

export const ExperienceTechStack = ({ items }: { items: ExperienceTechStackItemProps[] }) => {
    const { t } = useTranslation()

    if (items.length === 0) {
        return null
    }

    return (
        <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-300">
                {t("experience_section.tech_stack")}
            </p>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-2 text-sm text-neutral-100 shadow-[0_10px_18px_rgba(4,10,18,0.16)]"
                    >
                        <Image
                            src={item.src}
                            alt=""
                            width={18}
                            height={18}
                            className="h-[18px] w-[18px] object-contain"
                        />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

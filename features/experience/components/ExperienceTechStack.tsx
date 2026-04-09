import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation"

const telkomTechStack = [
    { name: "TypeScript", src: "/logo/skills/typescript.svg" },
    { name: "AdonisJS", src: "/logo/skills/adonisjs.svg" },
    { name: "MySQL", src: "/logo/skills/mysql.svg" },
    { name: "Redis", src: "/logo/skills/redis.svg" },
    { name: "Docker", src: "/logo/skills/docker.svg" },
] as const

export const ExperienceTechStack = () => {
    const { t } = useTranslation()

    return (
        <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-300">
                {t("experience_section.tech_stack")}
            </p>
            <div className="flex flex-wrap gap-2">
                {telkomTechStack.map((item) => (
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

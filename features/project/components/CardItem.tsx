import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import { ProjectItemProps } from "@/types"
import Link from "next/link"

const CardItem = ({ project }: { project: ProjectItemProps }) => {
    const { t } = useTranslation()

    return (
        <div className="flex h-full flex-col">
            <div className="relative aspect-[1.9/1] w-full overflow-hidden rounded-t-[inherit] border-b border-primary-200/30 bg-neutral-800">
                <Image
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 1280px) 28rem, (min-width: 768px) 42vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.02)_0%,rgba(6,12,20,0)_55%,rgba(6,12,20,0.24)_100%)]" />
            </div>

            <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 font-sub-heading text-3xl leading-none tracking-wide text-neutral-100">
                        {project.title}
                    </h3>
                    <span className="shrink-0 rounded-md bg-[#1188bc] px-3 py-1 text-xs font-semibold tracking-wide text-white">
                        {project.category}
                    </span>
                </div>

                <p className="line-clamp-4 text-sm leading-7 text-neutral-200 sm:text-base">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                        <span
                            key={`${project.id}-${tool.name}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-primary-200/20 bg-primary-400/85 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-100"
                        >
                            {tool.logo ? (
                                <Image
                                    src={tool.logo}
                                    alt=""
                                    width={14}
                                    height={14}
                                    className="h-3.5 w-3.5 shrink-0 object-contain"
                                />
                            ) : null}
                            <span>{tool.name}</span>
                        </span>
                    ))}
                </div>

                <Link
                    href={`/project/${project.id}`}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-sm font-medium text-neutral-100/90 transition-colors hover:text-neutral-100"
                >
                    <span>{t("view_projects")}</span>
                    <ExternalLink className="size-4" strokeWidth={2.2} />
                </Link>
            </div>
        </div>
    )
}

export default CardItem

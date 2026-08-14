import Image from "next/image"
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/context/LanguageContext"
import Link from "next/link"
import { useParams } from "next/navigation"

const getRepoLabel = (
  url: string,
  index: number,
  labels: {
    frontend: string;
    backend: string;
    cms: string;
    sourceCode: string;
  }
) => {
  if (url.includes("frontend")) return labels.frontend;
  if (url.includes("backend")) return labels.backend;
  if (url.includes("cms")) return labels.cms;
  return `${labels.sourceCode} ${index + 1}`;
};

const CardItem = ({ project }: { project: any }) => {
    const { t } = useTranslation()
    const { lang } = useLanguage()
    const params = useParams()
    const slug = params?.slug as string || ""
    const projectHref = slug ? `/${slug}/project/${project._id}` : `/project/${project._id}`

    const title = project.title?.[lang] || project.title?.en || project.title?.id || "Untitled Project";
    const categoryTitle = project.category?.title?.[lang] || project.category?.title?.en || "";
    const description = project.description?.[lang] || project.description?.en || project.description?.id || "";
    const previewImage = project.images?.[0]?.url || "/api/placeholder/400/225";
    const tools = project.toolsUsed || [];

    const repoLabels = {
        frontend: t("project_detail.repo_labels.frontend") ?? "Frontend Repo",
        backend: t("project_detail.repo_labels.backend") ?? "Backend Repo",
        cms: t("project_detail.repo_labels.cms") ?? "CMS Repo",
        sourceCode: t("project_detail.repo_labels.source_code") ?? "Source Code",
    };

    return (
        <div className="flex h-full flex-col">
            <div className="relative aspect-[1.9/1] w-full overflow-hidden rounded-t-[inherit] border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                <Image
                    src={previewImage}
                    alt={`${title} preview`}
                    fill
                    sizes="(min-width: 1280px) 28rem, (min-width: 768px) 42vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_60%,rgba(255,255,255,0.8)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0)_60%,rgba(15,23,42,0.8)_100%)]" />
            </div>

            <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 font-sub-heading text-2xl font-bold tracking-wide text-slate-800 dark:text-neutral-100 transition-colors duration-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                        {title}
                    </h3>
                    {categoryTitle && (
                        <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                            {categoryTitle}
                        </span>
                    )}
                </div>

                <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                    {tools.map((tool: any) => (
                        <span
                            key={tool._id}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/50 px-2.5 py-1 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                        >
                            {tool.iconUrl && (
                                <Image
                                    src={tool.iconUrl}
                                    alt=""
                                    width={12}
                                    height={12}
                                    className="h-3 w-3 shrink-0 object-contain"
                                />
                            )}
                            <span>{tool.name}</span>
                        </span>
                    ))}
                </div>

                <Link
                    href={projectHref}
                    className="group/link mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-sm font-semibold text-cyan-600 dark:text-cyan-400 transition-colors hover:text-cyan-700 dark:hover:text-cyan-300"
                >
                    <span>{t("view_projects") || "Lihat Proyek"}</span>
                    <span className="text-base transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default CardItem

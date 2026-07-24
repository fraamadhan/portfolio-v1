"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { useParams } from "next/navigation";

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

export const ProjectDetailPage = ({
  project,
}: {
  project: any;
}) => {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug as string || "";
  const backHref = slug ? `/${slug}/#projects` : "/#projects";

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = (project.images || []).map((img: any) => img.url).filter(Boolean);
  const activeImage = images[activeImageIndex] ?? '/api/placeholder/800/500';

  // Autoplay Carousel Effect - runs every 3 seconds if multiple images exist
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const title = project.title?.[lang] || project.title?.en || project.title?.id || "";
  const categoryTitle = project.category?.title?.[lang] || project.category?.title?.en || "";
  const role = project.roleInProject?.[lang] || project.roleInProject?.en || project.roleInProject?.id || "";
  const description = project.description?.[lang] || project.description?.en || project.description?.id || "";
  const keyHighlights = (project.keyHighlights || []).map((hl: any) => hl[lang] || hl.en || hl.id || hl).filter(Boolean);
  const tools = project.toolsUsed || [];

  const repoLabels = {
    frontend: t("project_detail.repo_labels.frontend") ?? "Frontend Repo",
    backend: t("project_detail.repo_labels.backend") ?? "Backend Repo",
    cms: t("project_detail.repo_labels.cms") ?? "CMS Repo",
    sourceCode: t("project_detail.repo_labels.source_code") ?? "Source Code",
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.1),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_38%,#cbd5e1_100%)] dark:bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.22),transparent_28%),linear-gradient(180deg,#334155_0%,#263240_38%,#1a2230_100%)] px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-10 dark:opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.12),transparent_62%)] dark:bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.26),transparent_62%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Link
          href={backHref}
          className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:border-white/20 hover:-translate-x-1"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>{t("project_detail.back") || "Back"}</span>
        </Link>

        <div className="space-y-3 text-center">
          <h1 className="font-sub-heading text-3xl tracking-wide text-gradient-primary sm:text-4xl">
            {title}
          </h1>
          <div className="space-y-1">
            {categoryTitle && (
              <p className="font-sub-heading text-2xl tracking-wide text-slate-800 dark:text-neutral-100">
                {categoryTitle}
              </p>
            )}
            {role && (
              <p className="text-base text-slate-600 dark:text-neutral-300">
                {t("project_detail.as_a")} {role}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <article className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] shadow-[0_24px_60px_rgba(148,163,184,0.08)] dark:shadow-[0_24px_60px_rgba(4,10,18,0.24)] p-4 backdrop-blur-sm sm:p-5">
            {/* Carousel Container with Touch Swipe Handlers */}
            <div 
              className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 dark:border-white/8 bg-slate-100 dark:bg-neutral-900 select-none cursor-grab active:cursor-grabbing"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                (e.currentTarget as any).touchStartX = touch.clientX;
              }}
              onTouchEnd={(e) => {
                const touchStartX = (e.currentTarget as any).touchStartX;
                if (typeof touchStartX !== 'number') return;
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                
                // Min swipe distance 50px
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    // Swipe left -> next image
                    setActiveImageIndex((prev) => (prev + 1) % images.length);
                  } else {
                    // Swipe right -> prev image
                    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                  }
                }
              }}
            >
              {/* Render all images for smooth cross-fade */}
              {images.map((image: string, index: number) => {
                const isActive = index === activeImageIndex;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      isActive 
                        ? "opacity-100 scale-100 pointer-events-auto" 
                        : "opacity-0 scale-[0.98] pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-top pointer-events-none select-none"
                      priority={index === 0}
                    />
                  </div>
                );
              })}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.15)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,13,21,0.04)_0%,rgba(7,13,21,0)_55%,rgba(7,13,21,0.3)_100%)] z-10" />
            </div>

            {/* Elastic pill indicator dots */}
            {images.length > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {images.map((_: string, index: number) => {
                  const isActive = index === activeImageIndex;

                  return (
                    <button
                      key={`image-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-2 transition-all duration-300 ease-out rounded-full border cursor-pointer ${
                        isActive
                          ? "w-6 bg-cyan-500 border-cyan-500 dark:bg-cyan-400 dark:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] dark:shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                          : "w-2 border-slate-300 dark:border-white/30 bg-slate-200 dark:bg-white/20 hover:bg-slate-300 dark:hover:bg-white/50"
                      }`}
                      aria-label={`${t("project_detail.show_screenshot")} ${index + 1}`}
                      aria-pressed={isActive}
                    />
                  );
                })}
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {(project.links || []).map((link: any, index: number) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-100/50 hover:bg-slate-200/50 text-slate-800 dark:border-primary-200/40 dark:bg-[linear-gradient(180deg,rgba(85,107,135,0.5),rgba(56,75,98,0.62))] px-4 py-3 text-sm dark:text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 dark:hover:border-primary-100/70 dark:hover:bg-[linear-gradient(180deg,rgba(100,127,159,0.6),rgba(63,83,109,0.72))]"
                >
                  {link.icon?.url ? (
                    <Image
                      src={link.icon.url}
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                  ) : (
                    <Image
                      src="/logo/ic_github.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-4 w-4 shrink-0"
                    />
                  )}
                  <span>{link.label || getRepoLabel(link.url, index, repoLabels)}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] shadow-[0_24px_60px_rgba(148,163,184,0.08)] dark:shadow-[0_24px_60px_rgba(4,10,18,0.2)] backdrop-blur-sm sm:p-7">
            <div className="space-y-7">
              {description && (
                <div className="space-y-4">
                  <h2 className="font-sub-heading text-3xl tracking-wide text-slate-800 dark:text-neutral-100">
                    {t("project_detail.project_overview")}
                  </h2>
                  <p className="text-sm leading-8 text-slate-600 dark:text-neutral-200 sm:text-base">
                    {description}
                  </p>
                </div>
              )}

              {keyHighlights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-sub-heading text-2xl tracking-wide text-rose-600 dark:text-[#f0a68f]">
                    {t("project_detail.key_highlights")}
                  </h3>
                  <ul className="space-y-2 text-sm leading-7 text-slate-600 dark:text-neutral-200 sm:text-base">
                    {keyHighlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 dark:bg-primary-100" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tools.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-sub-heading text-2xl tracking-wide text-rose-600 dark:text-[#f0a68f]">
                    {t("project_detail.technology_stack")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool: any) => (
                      <div
                        key={tool._id}
                        className="inline-flex min-w-[118px] items-center gap-2 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-100/40 dark:bg-slate-950/50 dark:bg-gradient-to-b dark:from-white/[0.08] dark:to-white/[0.03] px-3 py-2.5"
                      >
                        {tool.iconUrl ? (
                          <Image
                            src={tool.iconUrl}
                            alt={`${tool.name} logo`}
                            width={20}
                            height={20}
                            className="h-5 w-5 shrink-0 object-contain"
                          />
                        ) : (
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-slate-200 dark:bg-primary-300/35 text-[10px] font-bold text-slate-800 dark:text-neutral-100">
                            {tool.name.slice(0, 1)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold tracking-wide text-slate-700 dark:text-neutral-100">
                            {tool.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

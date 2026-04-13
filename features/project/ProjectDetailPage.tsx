"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ProjectDetailItemProps } from "@/types";

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
  project: ProjectDetailItemProps;
}) => {
  const { t } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = project.images[activeImageIndex] ?? project.images[0];
  const repoLabels = {
    frontend: t("project_detail.repo_labels.frontend") ?? "Frontend Repo",
    backend: t("project_detail.repo_labels.backend") ?? "Backend Repo",
    cms: t("project_detail.repo_labels.cms") ?? "CMS Repo",
    sourceCode: t("project_detail.repo_labels.source_code") ?? "Source Code",
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.22),transparent_28%),linear-gradient(180deg,#334155_0%,#263240_38%,#1a2230_100%)] px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_center,rgba(127,166,206,0.26),transparent_62%)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
        <Link
          href="/#projects"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/6 px-4 py-2.5 text-sm tracking-wide text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/25"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("project_detail.back")}</span>
        </Link>

        <div className="space-y-3 text-center">
          <h1 className="font-sub-heading text-3xl tracking-wide text-gradient-primary sm:text-4xl">
            {project.title}
          </h1>
          <div className="space-y-1">
            <p className="font-sub-heading text-2xl tracking-wide text-neutral-100">
              {project.category}
            </p>
            <p className="text-base leading-none text-neutral-300">
              {t("project_detail.as_a")} {project.role}
            </p>
          </div>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <article className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-4 shadow-[0_24px_60px_rgba(4,10,18,0.24)] backdrop-blur-sm sm:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/8 bg-neutral-900">
              <Image
                src={activeImage}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,21,0.04)_0%,rgba(7,13,21,0)_55%,rgba(7,13,21,0.3)_100%)]" />
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              {project.images.map((image, index) => {
                const isActive = image === activeImage;

                return (
                  <button
                    key={`${project.id}-image-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-3.5 w-3.5 rounded-full border transition ${isActive
                      ? "border-primary-100 bg-neutral-100 shadow-[0_0_16px_rgba(255,255,255,0.32)]"
                      : "border-white/18 bg-white/55 hover:bg-white/80"
                      }`}
                    aria-label={`${t("project_detail.show_screenshot")} ${index + 1}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {project.project_url.map((url, index) => (
                <Link
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-200/40 bg-[linear-gradient(180deg,rgba(85,107,135,0.5),rgba(56,75,98,0.62))] px-4 py-3 text-sm text-neutral-100 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary-100/70 hover:bg-[linear-gradient(180deg,rgba(100,127,159,0.6),rgba(63,83,109,0.72))]"
                >
                  <Image
                    src="/logo/ic_github.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0"
                  />
                  <span>{getRepoLabel(url, index, repoLabels)}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-6 shadow-[0_24px_60px_rgba(4,10,18,0.2)] backdrop-blur-sm sm:p-7">
            <div className="space-y-7">
              <div className="space-y-4">
                <h2 className="font-sub-heading text-3xl tracking-wide text-neutral-100">
                  {t("project_detail.project_overview")}
                </h2>
                <p className="text-sm leading-8 text-neutral-200 sm:text-base">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-sub-heading text-2xl tracking-wide text-[#f0a68f]">
                  {t("project_detail.key_highlights")}
                </h3>
                <ul className="space-y-2 text-sm leading-7 text-neutral-200 sm:text-base">
                  {project.key_highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-100" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-sub-heading text-2xl tracking-wide text-[#f0a68f]">
                  {t("project_detail.technology_stack")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tools.map((tool) => (
                    <div
                      key={`${project.id}-${tool.name}`}
                      className="inline-flex min-w-[118px] items-center gap-2 rounded-xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-3 py-2.5"
                    >
                      {tool.logo ? (
                        <Image
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary-300/35 text-[10px] font-bold text-neutral-100">
                          {tool.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold tracking-wide text-neutral-100">
                          {tool.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

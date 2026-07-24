"use client"

import { useTranslation } from "@/hooks/useTranslation"
import Card from "./components/Card";
import { projects as dummyProjects } from "@/data/dummy";
import { useState } from "react";

interface ProjectSectionProps {
  initialProjects?: any[];
}

const ProjectSection = ({ initialProjects }: ProjectSectionProps) => {
    const { t } = useTranslation();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Map dummy projects to align with Sanity schema shape if fallback is used
    const projects = initialProjects && initialProjects.length > 0 
      ? initialProjects 
      : dummyProjects.map((dp: any) => ({
          _id: String(dp.id),
          title: { en: dp.title, id: dp.title },
          description: { en: dp.description, id: dp.description },
          category: { title: { en: dp.category, id: dp.category } },
          images: [{ url: dp.imageSrc }],
          toolsUsed: dp.tools.map((tool: any, idx: number) => ({
            _id: `tool-dummy-${idx}`,
            name: tool.name,
            iconUrl: tool.logo
          })),
          links: []
        }));

    const visibleProjects = showAll ? projects : projects.slice(0, 6);

    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="flex min-h-[calc(85svh-5rem)] w-full flex-col items-center justify-start gap-y-10 bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.18),transparent_38%),linear-gradient(180deg,var(--color-neutral-700),var(--color-neutral-600))] px-4 py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:px-6 md:pb-12 dark:bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.18),transparent_38%),linear-gradient(180deg,var(--color-neutral-700),var(--color-neutral-600))]"
        >
            <h2
                id="projects-heading"
                className="
                    font-sub-heading text-4xl text-center tracking-wide
                    text-gradient-skills font-bold w-fit
                "
            >
                {t("project_section.my_project") || "Proyek Saya"}
            </h2>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visibleProjects.map((project: any) => {
                    const isHovered = hoveredId === project._id;
                    const isDimmed = hoveredId !== null && !isHovered;

                    return (
                        <Card 
                            key={project._id} 
                            project={project} 
                            isHovered={isHovered}
                            isDimmed={isDimmed}
                            onMouseEnter={() => setHoveredId(project._id)}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    );
                })}
            </div>
            
            {projects.length > 6 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="btn-hover-cool mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/20 cursor-pointer shadow-lg"
                >
                    {showAll 
                      ? (t("project_section.show_less") || "Show Less") 
                      : (t("project_section.show_more") || "Show More")}
                </button>
            )}
        </section>
    );
};

export default ProjectSection;

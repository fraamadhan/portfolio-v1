"use client"

import { useTranslation } from "@/hooks/useTranslation"
import Card from "./components/Card";
import { projects } from "@/data/dummy";


import { useState } from "react";

const PROJECTS_PER_PAGE = 3;

const ProjectSection = () => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

    const paginatedProjects = projects.slice(
        (page - 1) * PROJECTS_PER_PAGE,
        page * PROJECTS_PER_PAGE
    );

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    const getPaginationItems = () => {
        const items = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            if (page <= 4) {
                items.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page >= totalPages - 3) {
                items.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                items.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return items;
    };

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
                {t("project_section.my_project")}
            </h2>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedProjects.map((project) => (
                    <Card key={project.id} project={project} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex gap-2 mt-8">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                        aria-label="Previous page"
                    >
                        {'<'}
                    </button>
                    {getPaginationItems().map((item, idx) =>
                        item === '...'
                            ? (
                                <span key={"ellipsis-" + idx} className="flex h-9 w-9 items-center justify-center text-lg text-slate-700 dark:text-white">…</span>
                            )
                            : (
                                <button
                                    key={item}
                                    onClick={() => setPage(Number(item))}
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-lg font-semibold transition ${page === item ? 'border-blue-400 bg-blue-700 text-white dark:bg-blue-800' : 'border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10'}`}
                                    aria-current={page === item ? 'page' : undefined}
                                >
                                    {item}
                                </button>
                            )
                    )}
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-lg font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                        aria-label="Next page"
                    >
                        {'>'}
                    </button>
                </div>
            )}
        </section>
    );
};

export default ProjectSection;

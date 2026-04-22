"use client"

import { Button } from "@/components/ui/button";
import InfoItem from "@/components/ui/InfoItem";
import { useTranslation } from "@/hooks/useTranslation";
import { currentWorkRoleFormatted } from "@/lib";
import Link from "next/link";
import { MouseEvent } from "react";
import { usePathname } from "next/navigation";

const LandingPage = () => {
    const { t } = useTranslation();
    const pathname = usePathname();

    const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return;

        const target = document.getElementById("projects");
        if (!target) return;

        const header = document.querySelector("header");
        const headerOffset = header instanceof HTMLElement ? header.offsetHeight + 16 : 96;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        event.preventDefault();
        window.history.replaceState(null, "", "/#projects");
        window.scrollTo({
            top: Math.max(top, 0),
            behavior: "smooth",
        });
    };

    return (
        <section
            id="home"
            aria-labelledby="home-heading"
            className="w-full min-h-[calc(85svh-5rem)] sm:min-h-[calc(90svh-5rem)] flex items-start justify-center py-20 sm:pt-20 md:pb-10 bg-background"
        >
            <div className="flex w-full max-w-3xl flex-col items-center gap-12 sm:px-8">
                <header className="flex flex-col gap-4 text-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground font-texas-crust">
                        {t("landing_page_motto")}
                    </p>

                    <h1 id="home-heading" className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                        Fakhri Fajar Ramadhan
                    </h1>

                    <p className="text-lg sm:text-2xl font-medium text-foreground font-oswald">
                        {currentWorkRoleFormatted()}
                    </p>

                    <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-base font-inter">
                        {t("landing_page_description")}
                    </p>
                </header>

                <section aria-labelledby="professional-status-heading" className="flex flex-col items-center gap-4 text-center">
                    <h2 id="professional-status-heading" className="text-sm sm:text-lg font-oswald text-foreground">
                        {t("current_professional_status")}
                    </h2>

                    <dl className="flex flex-col gap-4 md:flex-row">
                        <InfoItem label={t("current_role")} value="Back-End Developer" />
                        <InfoItem label={t("work_based_in")} value="Indonesia" />
                        <InfoItem label={t("status")} value="Internship" />
                    </dl>
                </section>

                <section className="flex flex-col md:flex-row gap-4">
                    <Link href="/#projects" scroll={true} onClick={handleProjectsClick}>
                        <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC] font-inter">
                            {t("view_projects")}
                        </Button>
                    </Link>

                    <Link href="/dashboard#contact" scroll={true}>
                        <Button
                            variant="outline"
                            className="px-6 h-10 text-sm sm:text-base border-white/15 bg-white/5 text-foreground hover:bg-white/10 hover:text-foreground font-inter"
                        >
                            {t("collaborate_cta")}
                        </Button>
                    </Link>
                </section>
            </div>
        </section>
    )
}

export default LandingPage

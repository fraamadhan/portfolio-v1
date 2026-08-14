"use client"

import { Button } from "@/components/ui/button";
import InfoItem from "@/components/ui/InfoItem";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { currentWorkRole } from "@/data/dummy";
import { scrollToElementWithOffset } from "@/lib/utils";
import Link from "next/link";
import { MouseEvent } from "react";
import { usePathname } from "next/navigation";

interface LandingPageProps {
    profile?: {
        name?: string;
        landingSlogan?: { en?: string; id?: string };
        pastRoles?: string[];
        shortDescription?: { en?: string; id?: string };
        professionalStatus?: {
            isActive?: boolean;
            role?: string;
            location?: string;
            status?: string;
        };
    } | null;
}

const LandingPage = ({ profile }: LandingPageProps) => {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const pathname = usePathname();

    const handleProjectsClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return;

        const target = document.getElementById("projects");
        if (!target) return;

        event.preventDefault();
        window.history.replaceState(null, "", "/#projects");
        scrollToElementWithOffset(target);
    };

    // Mappings and Fallbacks
    const heroSlogan = profile?.landingSlogan?.[lang] || t("landing_page_motto");
    const profileName = profile?.name || "Fakhri Fajar Ramadhan";
    const roles = profile?.pastRoles && profile.pastRoles.length > 0 ? profile.pastRoles : currentWorkRole;
    const description = profile?.shortDescription?.[lang] || t("landing_page_description");

    const showStatus = profile?.professionalStatus ? (profile.professionalStatus.isActive ?? true) : true;
    const currentRole = profile?.professionalStatus?.role || "Back-End Developer";
    const workLocation = profile?.professionalStatus?.location || "Indonesia";
    const workStatus = profile?.professionalStatus?.status || "Internship";

    return (
        <section
            id="home"
            aria-labelledby="home-heading"
            className="flex min-h-[calc(85svh-5rem)] w-full items-start justify-center bg-[radial-gradient(circle_at_top,rgba(146,187,235,0.24),transparent_34%),linear-gradient(180deg,rgba(250,252,255,1),rgba(236,242,249,1))] py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:pb-10 dark:bg-[radial-gradient(circle_at_top,rgba(120,157,194,0.24),transparent_34%),linear-gradient(180deg,#253342_0%,#1f2a37_44%,#161f2b_100%)]"
        >
            <div className="flex w-full max-w-3xl flex-col items-center gap-12 sm:px-8">
                <header className="flex flex-col gap-4 text-center">
                    <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground font-texas-crust">
                        {heroSlogan}
                    </p>

                    <h1 id="home-heading" className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                        {profileName}
                    </h1>

                    <div className="text-lg sm:text-2xl font-medium text-foreground font-oswald flex items-center justify-center min-h-[36px] sm:min-h-[48px]">
                        <TypewriterEffect words={roles} pauseDuration={3000} />
                    </div>

                    <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground md:text-base font-inter">
                        {description}
                    </p>
                </header>

                {showStatus && (
                    <section aria-labelledby="professional-status-heading" className="flex flex-col items-center gap-4 text-center">
                        <h2 id="professional-status-heading" className="text-sm sm:text-lg font-oswald text-foreground">
                            {t("current_professional_status")}
                        </h2>

                        <dl className="flex flex-col gap-4 md:flex-row">
                            <InfoItem label={t("current_role")} value={currentRole} />
                            <InfoItem label={t("work_based_in")} value={workLocation} />
                            <InfoItem label={t("status")} value={workStatus} />
                        </dl>
                    </section>
                )}

                <section className="flex flex-col md:flex-row gap-4">
                    <Link href="/#projects" scroll={true} onClick={handleProjectsClick}>
                        <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC] font-inter">
                            {t("view_projects")}
                        </Button>
                    </Link>

                    <Link
                        href="/dashboard#contact"
                        scroll={false}
                        onClick={(e) => {
                            // Try to scroll if already on dashboard page
                            if (pathname === "/dashboard") {
                                e.preventDefault();
                                const contactSection = document.getElementById("contact");
                                if (contactSection) {
                                    scrollToElementWithOffset(contactSection);
                                    window.history.replaceState(null, "", "/dashboard#contact");
                                }
                            }
                            // If not on dashboard, let the Next.js Link component handle the navigation normally
                        }}
                    >
                        <Button
                            variant="outline"
                            className="h-10 border-slate-300/80 bg-white/75 px-6 text-sm text-foreground shadow-[0_10px_24px_rgba(148,163,184,0.16)] hover:bg-slate-100 hover:text-foreground sm:text-base font-inter dark:border-white/15 dark:bg-white/5 dark:shadow-none dark:hover:bg-white/10"
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

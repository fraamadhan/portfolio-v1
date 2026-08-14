"use client";

import { MouseEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getSectionIdFromHref, HOME_HREF, NAV_ITEMS } from "@/components/layout/navbar/navConfig";

const ACTIVE_SECTION_THRESHOLD = 0.45;

const getHomeNavItems = () => [HOME_HREF, ...NAV_ITEMS.map((item) => item.href)];

const getHeaderOffset = () => {
    const header = document.querySelector("header");
    return header instanceof HTMLElement ? header.offsetHeight + 16 : 96;
};

const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
    });

    return true;
};

export const useSectionNavigation = () => {
    const pathname = usePathname();
    const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);
    const isPortfolioPage = useMemo(() => segments.length === 1 && !["cms", "dashboard", "gateway", "api"].includes(segments[0]), [segments]);
    const slug = isPortfolioPage ? segments[0] : "";

    const navItems = useMemo(() => getHomeNavItems(), []);
    const [activeSection, setActiveSection] = useState(slug ? `/${slug}#home` : HOME_HREF);

    useEffect(() => {
        if (!isPortfolioPage) return;

        const visibleSections = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const href = slug ? `/${slug}#${entry.target.id}` : `/#${entry.target.id}`;

                    if (entry.isIntersecting) {
                        visibleSections.set(href, entry.intersectionRatio);
                    } else {
                        visibleSections.delete(href);
                    }
                });

                const [nextActive] = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
                if (nextActive) {
                    setActiveSection(nextActive);
                    return;
                }

                if (window.scrollY < 120) {
                    setActiveSection(slug ? `/${slug}#home` : HOME_HREF);
                }
            },
            {
                rootMargin: `-${getHeaderOffset()}px 0px -40% 0px`,
                threshold: [0.2, ACTIVE_SECTION_THRESHOLD, 0.7],
            }
        );

        navItems.forEach((href) => {
            const sectionId = getSectionIdFromHref(href);
            const target = document.getElementById(sectionId);
            if (target) {
                observer.observe(target);
            }
        });

        const syncFromHash = () => {
            const currentHash = window.location.hash;
            if (!currentHash) {
                setActiveSection(slug ? `/${slug}#home` : HOME_HREF);
                return;
            }

            const href = slug ? `/${slug}${currentHash}` : `/${currentHash}`;
            // check against expected dynamic pattern
            const lookupHref = `/${currentHash}`;
            if (navItems.includes(lookupHref)) {
                setActiveSection(href);
            }
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            observer.disconnect();
            window.removeEventListener("hashchange", syncFromHash);
        };
    }, [navItems, pathname, isPortfolioPage, slug]);

    const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        if (!isPortfolioPage) return;

        const sectionId = getSectionIdFromHref(href);
        if (!sectionId) return;

        const didScroll = scrollToSection(sectionId);
        if (!didScroll) return;

        event.preventDefault();
        window.history.replaceState(null, "", href);
        setActiveSection(href);
    };

    return {
        activeSection: isPortfolioPage ? activeSection : "",
        handleNavClick,
    };
};

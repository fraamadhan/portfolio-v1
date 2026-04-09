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
    const navItems = useMemo(() => getHomeNavItems(), []);
    const [activeSection, setActiveSection] = useState(HOME_HREF);

    useEffect(() => {
        if (pathname !== "/") return;

        const visibleSections = new Map<string, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const href = `/#${entry.target.id}`;

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
                    setActiveSection(HOME_HREF);
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
                setActiveSection(HOME_HREF);
                return;
            }

            const href = `/${currentHash}`;
            if (navItems.includes(href)) {
                setActiveSection(href);
            }
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            observer.disconnect();
            window.removeEventListener("hashchange", syncFromHash);
        };
    }, [navItems, pathname]);

    const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== "/") return;

        const sectionId = getSectionIdFromHref(href);
        if (!sectionId) return;

        const didScroll = scrollToSection(sectionId);
        if (!didScroll) return;

        event.preventDefault();
        window.history.replaceState(null, "", href);
        setActiveSection(href);
    };

    return {
        activeSection: pathname === "/" ? activeSection : "",
        handleNavClick,
    };
};

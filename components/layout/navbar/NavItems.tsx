"use client";

import Link from "next/link";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { HOME_HREF } from "./navConfig";

import { usePathname } from "next/navigation";

export default function NavItems() {
    const [isOpen, setIsOpen] = useState(false);
    const { activeSection, handleNavClick } = useSectionNavigation();
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[0] && !["cms", "dashboard", "gateway", "api"].includes(segments[0]) ? segments[0] : "";

    const dynamicHomeHref = slug ? `/${slug}#home` : HOME_HREF;
    const displayName = "FAKHRI";

    return (
        <>
            <Link
                href={dynamicHomeHref}
                onClick={handleNavClick(dynamicHomeHref)}
                className={`text-3xl font-bold tracking-wide ${activeSection === dynamicHomeHref ? "text-slate-900 dark:text-white" : "text-slate-800/90 dark:text-white/90"}`}
                aria-current={activeSection === dynamicHomeHref ? "page" : undefined}
            >
                {displayName}
            </Link>

            <DesktopNav
                activeSection={activeSection}
                handleNavClick={handleNavClick}
            />

            <button
                type="button"
                className="md:hidden flex flex-col gap-1"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
            >
                <span className="h-[2px] w-6 bg-slate-800 dark:bg-white"></span>
                <span className="h-[2px] w-6 bg-slate-800 dark:bg-white"></span>
                <span className="h-[2px] w-6 bg-slate-800 dark:bg-white"></span>
            </button>

            <MobileNav
                isOpen={isOpen}
                closeMenu={() => setIsOpen(false)}
                activeSection={activeSection}
                handleNavClick={handleNavClick}
            />
        </>
    );
}

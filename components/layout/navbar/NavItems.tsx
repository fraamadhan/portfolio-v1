"use client";

import Link from "next/link";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { HOME_HREF } from "./navConfig";

export default function NavItems() {
    const [isOpen, setIsOpen] = useState(false);
    const { activeSection, handleNavClick } = useSectionNavigation();

    return (
        <>
            <Link
                href={HOME_HREF}
                onClick={handleNavClick(HOME_HREF)}
                className={`text-3xl font-bold tracking-wide ${activeSection === HOME_HREF ? "text-white" : "text-white/90"}`}
                aria-current={activeSection === HOME_HREF ? "page" : undefined}
            >
                FAKHRI
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
                <span className="w-6 h-[2px] bg-white"></span>
                <span className="w-6 h-[2px] bg-white"></span>
                <span className="w-6 h-[2px] bg-white"></span>
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

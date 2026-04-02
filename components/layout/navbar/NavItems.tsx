"use client";

import Link from "next/link";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function NavItems() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Link href="/#home" className="text-3xl font-bold tracking-wide text-white">
                FAKHRI
            </Link>

            <DesktopNav />

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
            />
        </>
    );
}

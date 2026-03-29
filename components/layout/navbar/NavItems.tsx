"use client";

import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function NavItems() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <h1 className="text-3xl font-bold tracking-wide text-white">
                FAKHRI
            </h1>

            <DesktopNav />

            <button
                className="md:hidden flex flex-col gap-1"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
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

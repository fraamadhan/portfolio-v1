"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "@/hooks/useTranslation";
import { NAV_ITEMS, PRIMARY_ITEMS } from "./navConfig";

type Props = {
    activeSection: string;
    handleNavClick: (href: string) => MouseEventHandler<HTMLAnchorElement>;
};

export default function DesktopNav({ activeSection, handleNavClick }: Props) {
    const { t } = useTranslation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement | null>(null);

    const dropdownItems = NAV_ITEMS.filter(
        (item) => !PRIMARY_ITEMS.some((primary) => primary.labelKey === item.labelKey)
    );

    useEffect(() => {
        if (!isMoreOpen) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (!moreMenuRef.current?.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMoreOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isMoreOpen]);

    return (
        <div className="hidden md:flex items-center gap-5 lg:gap-15 text-xl">
            <ul className="flex items-center gap-5 lg:gap-15">
                {PRIMARY_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                        <Link
                            href={item.href}
                            onClick={handleNavClick(item.href)}
                            className={activeSection === item.href ? "text-white font-semibold" : "text-white/80"}
                            aria-current={activeSection === item.href ? "page" : undefined}
                        >
                            {t(item.labelKey)}
                        </Link>
                    </li>
                ))}

                <li className="hidden xl:block">
                    <Link
                        href="/#projects"
                        onClick={handleNavClick("/#projects")}
                        className={activeSection === "/#projects" ? "text-white font-semibold" : "text-white/80"}
                        aria-current={activeSection === "/#projects" ? "page" : undefined}
                    >
                        {t("navbar.projects")}
                    </Link>
                </li>

                <li className="hidden xl:block">
                    <Link
                        href="/#contact"
                        onClick={handleNavClick("/#contact")}
                        className={activeSection === "/#contact" ? "text-white font-semibold" : "text-white/80"}
                        aria-current={activeSection === "/#contact" ? "page" : undefined}
                    >
                        {t("navbar.contact")}
                    </Link>
                </li>

                <li className="hidden xl:block">
                    <Link
                        href="/#dashboard"
                        onClick={handleNavClick("/#dashboard")}
                        className={activeSection === "/#dashboard" ? "text-white font-semibold" : "text-white/80"}
                        aria-current={activeSection === "/#dashboard" ? "page" : undefined}
                    >
                        {t("navbar.dashboard")}
                    </Link>
                </li>

                <li className="relative xl:hidden" ref={moreMenuRef}>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1"
                        onClick={() => setIsMoreOpen((prev) => !prev)}
                        aria-haspopup="menu"
                        aria-expanded={isMoreOpen}
                        aria-controls="desktop-more-menu"
                    >
                        {t("navbar.more")}
                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {isMoreOpen && (
                        <div
                            id="desktop-more-menu"
                            role="menu"
                            className="absolute top-full right-0 mt-3 min-w-44 rounded-md border border-white/30 bg-[#1E2A38] p-3 shadow-lg"
                        >
                            <ul className="flex flex-col gap-3 text-lg">
                                {dropdownItems.map((item) => (
                                    <li key={item.labelKey}>
                                        <Link
                                            href={item.href}
                                            role="menuitem"
                                            onClick={(event) => {
                                                handleNavClick(item.href)(event);
                                                setIsMoreOpen(false);
                                            }}
                                            className={activeSection === item.href ? "text-white font-semibold" : "text-white/80"}
                                            aria-current={activeSection === item.href ? "page" : undefined}
                                        >
                                            {t(item.labelKey)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            </ul>
            <LanguageSwitch />
        </div>
    );
}

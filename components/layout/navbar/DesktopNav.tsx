"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import { useTranslation } from "@/hooks/useTranslation";
import { NAV_ITEMS, PRIMARY_ITEMS } from "./navConfig";

type Props = {
    activeSection: string;
    handleNavClick: (href: string) => MouseEventHandler<HTMLAnchorElement>;
};

export default function DesktopNav({ activeSection, handleNavClick }: Props) {
    const { t } = useTranslation();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreMenuRef = useRef<HTMLLIElement | null>(null);

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
        <div className="hidden md:flex items-center gap-5 text-xl lg:gap-8">
            <ul className="flex items-center gap-5 lg:gap-10">
                {PRIMARY_ITEMS.map((item) => (
                    <li key={item.labelKey}>
                        <Link
                            href={item.href}
                            onClick={handleNavClick(item.href)}
                            className={`px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 ${
                                activeSection === item.href
                                    ? "font-semibold text-slate-900 dark:text-white"
                                    : "text-slate-700/85 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                            }`}
                            aria-current={activeSection === item.href ? "page" : undefined}
                        >
                            {t(item.labelKey)}
                        </Link>
                    </li>
                ))}

                <li className="hidden xl:block">
                    <Link
                        href="/#testimonials"
                        onClick={handleNavClick("/#testimonials")}
                        className={`px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 ${
                            activeSection === "/#testimonials"
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-700/85 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        aria-current={activeSection === "/#testimonials" ? "page" : undefined}
                    >
                        {t("navbar.testimonials")}
                    </Link>
                </li>

                <li className="hidden xl:block">
                    <Link
                        href="/dashboard"
                        onClick={handleNavClick("/dashboard")}
                        className={`px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 ${
                            activeSection === "/dashboard"
                                ? "font-semibold text-slate-900 dark:text-white"
                                : "text-slate-700/85 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        aria-current={activeSection === "/dashboard" ? "page" : undefined}
                    >
                        {t("navbar.dashboard")}
                    </Link>
                </li>

                <li className="relative xl:hidden" ref={moreMenuRef}>
                    <button
                        type="button"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white/85"
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
                            className="absolute top-full right-0 mt-3 min-w-44 rounded-md border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm dark:border-white/20 dark:bg-[#1E2A38]/96"
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
                                            className={`block px-3 py-2 rounded-lg transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10 ${
                                                activeSection === item.href
                                                    ? "font-semibold text-slate-900 dark:text-white"
                                                    : "text-slate-700/85 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
                                            }`}
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
            <div className="flex items-center gap-3">
                <ThemeSwitch />
                <LanguageSwitch />
            </div>
        </div>
    );
}

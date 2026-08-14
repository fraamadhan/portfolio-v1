"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { NAV_ITEMS, useActiveSlug } from "./navConfig";
import { usePathname } from "next/navigation";

type Props = {
    isOpen: boolean;
    closeMenu: () => void;
    activeSection: string;
    handleNavClick: (href: string) => MouseEventHandler<HTMLAnchorElement>;
};

export default function MobileNav({ isOpen, closeMenu, activeSection, handleNavClick }: Props) {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const pathname = usePathname();

    const slug = useActiveSlug();

    const getDynamicHref = (href: string) => {
        if (href === "/dashboard") {
            return slug ? `/${slug}/dashboard` : href;
        }
        if (href.startsWith("/#")) {
            return slug ? `/${slug}${href.slice(1)}` : href;
        }
        return href;
    };

    const displayNavItems = NAV_ITEMS.filter(
        (item) => item.href !== "/dashboard" || slug === "fakhri-fajar-ramadhan"
    );

    useEffect(() => {
        if (!isOpen) return;

        const html = document.documentElement;
        const body = document.body;
        const scrollY = window.scrollY;

        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        const prevBodyPosition = body.style.position;
        const prevBodyTop = body.style.top;
        const prevBodyWidth = body.style.width;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            body.style.position = prevBodyPosition;
            body.style.top = prevBodyTop;
            body.style.width = prevBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [closeMenu, isOpen]);

    if (typeof document === "undefined" || !isOpen) return null;

    return createPortal(
        <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 text-2xl lg:hidden ${
                isDark
                    ? "bg-[radial-gradient(circle_at_top,rgba(127,166,206,0.18),transparent_32%),linear-gradient(180deg,rgba(30,42,56,0.98),rgba(17,24,39,0.99))] text-white"
                    : "bg-[linear-gradient(180deg,rgba(245,249,255,0.98),rgba(228,237,249,0.98))] text-slate-900"
            }`}
        >
            <div className={`pointer-events-none absolute inset-0 ${isDark ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:120px_120px] opacity-25" : ""}`} />

            <button
                type="button"
                onClick={closeMenu}
                aria-label="Close mobile menu"
                className={`absolute top-8 right-8 z-[201] text-4xl ${isDark ? "text-white" : "text-slate-800"}`}
            >
                X
            </button>

            <nav aria-label="Mobile primary" className="relative z-10">
                <ul className="flex flex-col items-center gap-8">
                    {displayNavItems.map((item) => (
                        <li key={item.labelKey}>
                            <Link
                                href={getDynamicHref(item.href)}
                                onClick={(event) => {
                                    handleNavClick(getDynamicHref(item.href))(event);
                                    closeMenu();
                                }}
                                className={`px-5 py-2 rounded-xl transition-all duration-300 ${
                                    activeSection === getDynamicHref(item.href)
                                        ? isDark
                                            ? "font-semibold text-white bg-white/10"
                                            : "font-semibold text-slate-900 bg-slate-200/50"
                                        : isDark
                                            ? "text-white/82 hover:text-white hover:bg-white/10"
                                            : "text-slate-700/85 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                                aria-current={activeSection === getDynamicHref(item.href) ? "page" : undefined}
                            >
                                {t(item.labelKey)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="relative z-10 flex items-center gap-3">
                <ThemeSwitch />
                <LanguageSwitch />
            </div>
        </div>,
        document.body
    );
}

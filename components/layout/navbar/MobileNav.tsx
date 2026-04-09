"use client";

import Link from "next/link";
import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "@/hooks/useTranslation";
import { NAV_ITEMS } from "./navConfig";

type Props = {
    isOpen: boolean;
    closeMenu: () => void;
    activeSection: string;
    handleNavClick: (href: string) => MouseEventHandler<HTMLAnchorElement>;
};

export default function MobileNav({ isOpen, closeMenu, activeSection, handleNavClick }: Props) {
    const { t } = useTranslation();

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
            className="lg:hidden fixed inset-0 bg-[#1E2A38] z-100 flex flex-col items-center justify-center gap-8 text-white text-2xl"
        >

            <button
                type="button"
                onClick={closeMenu}
                aria-label="Close mobile menu"
                className="absolute top-8 right-8 text-4xl z-[201]"
            >
                X
            </button>

            <nav aria-label="Mobile primary">
                <ul className="flex flex-col items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.labelKey}>
                            <Link
                                href={item.href}
                                onClick={(event) => {
                                    handleNavClick(item.href)(event);
                                    closeMenu();
                                }}
                                className={activeSection === item.href ? "text-white font-semibold" : "text-white/80"}
                                aria-current={activeSection === item.href ? "page" : undefined}
                            >
                                {t(item.labelKey)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <LanguageSwitch />
        </div>,
        document.body
    );
}

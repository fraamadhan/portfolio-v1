"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LanguageSwitch from "./LanguageSwitch";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
    isOpen: boolean;
    closeMenu: () => void;
};

export default function MobileNav({ isOpen, closeMenu }: Props) {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !isOpen) return;

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

        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            body.style.position = prevBodyPosition;
            body.style.top = prevBodyTop;
            body.style.width = prevBodyWidth;
            window.scrollTo(0, scrollY);
        };
    }, [isOpen, mounted]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="lg:hidden fixed inset-0 bg-[#1E2A38] z-100 flex flex-col items-center justify-center gap-8 text-white text-2xl">

            <button
                onClick={closeMenu}
                aria-label="Close mobile menu"
                className="absolute top-8 right-8 text-4xl z-[201]"
            >
                X
            </button>

            <Link href="#" onClick={closeMenu}>{t("navbar.about")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.skills")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.experience")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.projects")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.testimonials")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.contact")}</Link>
            <Link href="#" onClick={closeMenu}>{t("navbar.dashboard")}</Link>

            <LanguageSwitch />
        </div>,
        document.body
    );
}

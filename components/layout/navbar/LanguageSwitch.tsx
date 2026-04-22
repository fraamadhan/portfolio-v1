"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function LanguageSwitch() {
    const { lang, setLang } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            role="group"
            aria-label="Language switcher"
            className={`relative flex w-[88px] items-center rounded-full p-1 backdrop-blur-sm ${
                isDark
                    ? "border border-white/30 bg-transparent shadow-none"
                    : "border border-slate-300/80 bg-white/80 shadow-[0_10px_30px_rgba(148,163,184,0.18)]"
            }`}
        >
            <div
                className={`absolute top-1 left-1 h-10 w-10 rounded-full bg-primary-100 transition-transform duration-300 ${lang === "en" ? "translate-x-[39px]" : "translate-x-0"
                    }`}
            />

            <button
                type="button"
                onClick={() => setLang("id")}
                aria-pressed={lang === "id"}
                aria-label="Switch language to Indonesian"
                className="relative flex items-center justify-center w-10 h-10 z-10"
            >
                <Image src="/idn-circle.svg" width={24} height={24} alt="Indonesian" />
            </button>

            <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                aria-label="Switch language to English"
                className="relative flex items-center justify-center w-10 h-10 z-10"
            >
                <Image src="/eng-circle.svg" width={24} height={24} alt="English" />
            </button>
        </div>
    );
}

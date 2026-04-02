"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitch() {
    const { lang, setLang } = useLanguage();

    return (
        <div
            role="group"
            aria-label="Language switcher"
            className="relative flex items-center rounded-full border border-white/40 p-1 w-[88px]"
        >
            <div
                className={`absolute top-1 left-1 w-10 h-10 rounded-full bg-primary-100 transition-transform duration-300 ${lang === "en" ? "translate-x-[39px]" : "translate-x-0"
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

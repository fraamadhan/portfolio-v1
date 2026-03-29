"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "id" | "en";

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>("id");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Language | null;
        if (saved === "id" || saved === "en") {
            setLang(saved);
        }
        setReady(true);
    }, []);

    useEffect(() => {
        if (!ready) return;
        localStorage.setItem("lang", lang);
    }, [lang, ready]);

    if (!ready) return null;

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used inside LanguageProvider");
    }

    return context;
}

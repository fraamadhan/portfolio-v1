"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";

type Language = "id" | "en";

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

const subscribe = () => () => {};

function getStoredLanguage(): Language {
    if (typeof window === "undefined") {
        return "id";
    }

    const saved = localStorage.getItem("lang");
    return saved === "id" || saved === "en" ? saved : "id";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const isClient = useSyncExternalStore(subscribe, () => true, () => false);
    const [lang, setLang] = useState<Language>(getStoredLanguage);

    useEffect(() => {
        if (!isClient) return;
        localStorage.setItem("lang", lang);
    }, [isClient, lang]);

    const value = useMemo(() => ({ lang, setLang }), [lang]);

    if (!isClient) return null;

    return (
        <LanguageContext.Provider value={value}>
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

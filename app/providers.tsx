'use client'

import { SessionProvider } from 'next-auth/react'
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <LanguageProvider>{children}</LanguageProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}

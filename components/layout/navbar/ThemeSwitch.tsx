"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      role="group"
      aria-label="Theme switcher"
      className={`relative flex items-center rounded-full p-1 backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-500 ${
        isDark
          ? "border border-white/20 bg-white/8 shadow-none"
          : "border border-slate-300/80 bg-white/80 shadow-[0_10px_30px_rgba(148,163,184,0.18)]"
      }`}
    >
      <div
        className={`absolute top-1 h-10 w-10 rounded-full transition-[transform,background,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? "bg-[linear-gradient(180deg,#8dbdff,#5d8de0)] shadow-[0_10px_25px_rgba(93,141,224,0.35)]"
            : "bg-[linear-gradient(180deg,#fff2a6,#f7c75f)] shadow-[0_10px_22px_rgba(247,199,95,0.28)]"
        } ${
          theme === "dark"
            ? "translate-x-[39px] scale-100"
            : "translate-x-0 scale-100"
        }`}
      />

      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        aria-label="Switch to light mode"
        className={`relative z-10 flex h-10 w-10 items-center justify-center transition-[color,transform,opacity] duration-500 ${
          isDark ? "text-slate-200/75" : "text-amber-600"
        }`}
      >
        <Sun
          className={`h-4 w-4 transition-transform duration-500 ${
            isDark ? "scale-75 rotate-45 opacity-60" : "scale-100 rotate-0 opacity-100"
          }`}
        />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark mode"
        className={`relative z-10 flex h-10 w-10 items-center justify-center transition-[color,transform,opacity] duration-500 ${
          isDark ? "text-slate-100" : "text-slate-700/75"
        }`}
      >
        <Moon
          className={`h-4 w-4 transition-transform duration-500 ${
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-45 opacity-60"
          }`}
        />
      </button>
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeContextValue = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
  toggleTheme: () => void;
};

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ViewTransitionCapableDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function persistTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem(STORAGE_KEY);

    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const updateTheme = useCallback((nextTheme: Theme) => {
    if (nextTheme === theme) return;

    const commitThemeChange = () => {
      flushSync(() => {
        setThemeState(nextTheme);
      });

      applyTheme(nextTheme);
      persistTheme(nextTheme);
    };

    const canAnimate =
      typeof document !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const transitionDocument = document as ViewTransitionCapableDocument;

    if (canAnimate && typeof transitionDocument.startViewTransition === "function") {
      transitionDocument.startViewTransition(() => {
        commitThemeChange();
      });
      return;
    }

    commitThemeChange();
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (nextTheme) => {
        updateTheme(nextTheme);
      },
      toggleTheme: () => {
        updateTheme(theme === "dark" ? "light" : "dark");
      },
    }),
    [theme, updateTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

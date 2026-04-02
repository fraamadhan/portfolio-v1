import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import type { Translation } from "@/types/Translation";

const dictionaries: Record<"en" | "id", Translation> = {
  en,
  id,
};

export function useTranslation() {
  const { lang } = useLanguage();

  const dict = dictionaries[lang];

  function t(path: string) {
    return path.split(".").reduce<unknown>((value, key) => {
      if (typeof value !== "object" || value === null || !(key in value)) {
        return undefined;
      }

      return (value as Record<string, unknown>)[key];
    }, dict) as string | undefined;
  }

  return { t };
}

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
    return path.split(".").reduce((obj: any, key) => obj?.[key], dict);
  }

  return { t };
}

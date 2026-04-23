"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, type Locale, type Translations } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fr",
  t: translations.fr,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");
  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

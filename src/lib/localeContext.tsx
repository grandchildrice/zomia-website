'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Locale } from '../types';
import translations from '@/locales/translations.json';

type TranslationsType = typeof translations;

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children, initialLocale = 'ja' }: { children: ReactNode, initialLocale?: Locale }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  
  // 翻訳を取得する関数
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }
    
    return result;
  };
  
  const value = {
    locale,
    setLocale,
    t
  };
  
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

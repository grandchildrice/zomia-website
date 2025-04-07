import { i18n } from '@/lib/i18n-utils';

export type Locale = (typeof i18n.locales)[number];
export type PageKey = 'home' | 'about' | 'news' | 'research' | 'business' | 'community' | 'contact';

export interface DictionaryEntry {
    [key: string]: string | DictionaryEntry | Array<DictionaryEntry>;
}

export interface Dictionary {
    [namespace: string]: DictionaryEntry;
}

export interface Params {
    lang: Locale;
}

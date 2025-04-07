import 'server-only';
import type { Locale } from '@/types';

// We need to load the translations at request time, as we don't know the locale in advance
export const getTranslations = async (locale: Locale, namespace: string) => {
    try {
        return (await import(`@/locales/${locale}/${namespace}.json`)).default;
    } catch (error) {
        console.error(`Error loading translations: ${locale}/${namespace}`, error);
        return {};
    }
};

// Get dictionary for a specific namespace
export const getDictionary = async (locale: Locale, namespaces: string[] = ['common']) => {
    const dictionary: Record<string, any> = {};

    for (const namespace of namespaces) {
        dictionary[namespace] = await getTranslations(locale, namespace);
    }

    return dictionary;
};

export const i18n = {
    defaultLocale: 'ja' as const,
    locales: ['ja', 'en'] as const,
};

export type I18nConfig = typeof i18n;

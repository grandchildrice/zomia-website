// Client-side version of i18n utilities (without server-only restriction)
import type { Locale } from '@/types';

// A client-side version of getTranslations
export const getClientTranslations = async (locale: Locale, namespace: string) => {
    try {
        return (await import(`@/locales/${locale}/${namespace}.json`)).default;
    } catch (error) {
        console.error(`Error loading translations: ${locale}/${namespace}`, error);
        return {};
    }
};

// Client-side version of getDictionary
export const getClientDictionary = async (locale: Locale, namespaces: string[] = ['common']) => {
    const dictionary: Record<string, any> = {};

    for (const namespace of namespaces) {
        dictionary[namespace] = await getClientTranslations(locale, namespace);
    }

    return dictionary;
};

export const i18n = {
    defaultLocale: 'ja' as const,
    locales: ['ja', 'en'] as const,
};

import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import NewsDetail from '@/components/NewsDetail';

interface NewsDetailPageProps {
    params: {
        id: string;
        lang: string;
    };
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

// Pre-generate static params for popular news articles
export async function generateStaticParams() {
    // Skip static generation during development
    if (process.env.NODE_ENV === 'development') {
        return [];
    }

    try {
        // Only generate static params during build
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;
        if (!baseUrl) {
            console.warn('No base URL found, skipping static generation');
            return [];
        }

        // Fetch recent news articles for both languages
        const [jaNews, enNews] = await Promise.all([
            fetch(`${baseUrl}/api/notion/news?locale=ja`),
            fetch(`${baseUrl}/api/notion/news?locale=en`)
        ]);

        const jaData = await jaNews.json();
        const enData = await enNews.json();

        const params = [];
        
        // Add Japanese news articles
        if (jaData.news && Array.isArray(jaData.news)) {
            for (const article of jaData.news.slice(0, 10)) { // Pre-generate top 10
                params.push({ lang: 'ja', id: article.id });
            }
        }

        // Add English news articles
        if (enData.news && Array.isArray(enData.news)) {
            for (const article of enData.news.slice(0, 10)) { // Pre-generate top 10
                params.push({ lang: 'en', id: article.id });
            }
        }

        return params;
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export async function generateMetadata({ params: { lang, id } }: NewsDetailPageProps) {
    const dict = await getDictionary(lang as Locale, ['common', 'news']);

    return {
        title: `${dict.news.title} | ${dict.common.siteTitle}`,
        description: dict.news.subtitle,
    };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
    const { id, lang } = params;
    const locale = lang as Locale;

    return (
        <PageLayout locale={locale}>
            <NewsDetail id={id} locale={locale} />
        </PageLayout>
    );
}

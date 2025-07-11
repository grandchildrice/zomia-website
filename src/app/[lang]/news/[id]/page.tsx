import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import NewsDetail from '@/components/NewsDetail';
import { Metadata } from 'next';

interface NewsDetailPageProps {
    params: {
        id: string;
        lang: string;
    };
}

// Remove ISR and static generation to avoid 500 errors
// All pages will be rendered on-demand with client-side caching

export async function generateMetadata({ params: { lang, id } }: NewsDetailPageProps): Promise<Metadata> {
    const dict = await getDictionary(lang as Locale, ['common', 'news']);
    
    try {
        // Fetch news data from Notion API
        const response = await fetch(`${process.env.WEBSITE_URL || 'http://localhost:3000'}/api/notion/news/${id}?locale=${lang}`, {
            cache: 'force-cache',
            next: { revalidate: 300 } // Cache for 5 minutes
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch news data');
        }
        
        const data = await response.json();
        const news = data.news;
        
        // Extract first sentence from content for description
        const firstSentence = news.content
            ? news.content.split('\n')[0].split('.')[0].trim() + '.'
            : news.topic || dict.news.subtitle;
        
        // Get cover image from images array (first image if available)
        const coverImage = news.images && news.images.length > 0 
            ? news.images[0].url 
            : `${process.env.WEBSITE_URL || 'http://localhost:3000'}/images/ogp.jpg`;
        
        return {
            title: `${news.title} | ${dict.common.siteTitle}`,
            description: firstSentence,
            openGraph: {
                title: news.title,
                description: firstSentence,
                url: `${process.env.WEBSITE_URL || 'http://localhost:3000'}/${lang}/news/${id}`,
                siteName: dict.common.siteTitle,
                images: [
                    {
                        url: coverImage,
                        width: 1200,
                        height: 630,
                        alt: news.title,
                    }
                ],
                locale: lang === 'ja' ? 'ja_JP' : 'en_US',
                type: 'article',
                publishedTime: news.date,
                authors: ['ZOMIA'],
                section: news.category || 'News',
            },
            twitter: {
                card: 'summary_large_image',
                title: news.title,
                description: firstSentence,
                images: [coverImage],
            },
        };
    } catch (error) {
        console.error('Error generating metadata for news:', error);
        
        // Fallback to generic metadata
        return {
            title: `${dict.news.title} | ${dict.common.siteTitle}`,
            description: dict.news.subtitle,
            openGraph: {
                title: dict.news.title,
                description: dict.news.subtitle,
                url: `${process.env.WEBSITE_URL || 'http://localhost:3000'}/${lang}/news/${id}`,
                siteName: dict.common.siteTitle,
                images: [
                    {
                        url: `${process.env.WEBSITE_URL || 'http://localhost:3000'}/images/ogp.jpg`,
                        width: 1200,
                        height: 630,
                        alt: dict.news.title,
                    }
                ],
                locale: lang === 'ja' ? 'ja_JP' : 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: dict.news.title,
                description: dict.news.subtitle,
            },
        };
    }
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

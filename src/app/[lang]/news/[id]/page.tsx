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

import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import Image from 'next/image';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'research']);

    return {
        title: `${dict.research.title} | ${dict.common.siteTitle}`,
        description: dict.research.subtitle,
    };
}

export default async function ResearchPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'research']);
    const t = dict.research as any;

    return (
        <PageLayout locale={lang as Locale}>
            {/* ヒーローセクション */}
            <section className="pt-24 pb-16 bg-primary-dark">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-display text-center mb-6 magic-text">
                        {t.title}
                    </h1>
                    <p className="text-center max-w-3xl mx-auto opacity-80 text-lg">
                        {t.subtitle}
                    </p>
                </div>
            </section>

            {/* 研究概要セクション */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="magic-card mb-16">
                        <h2 className="text-2xl font-display mb-6 text-accent">
                            {t.introTitle}
                        </h2>

                        <div className="space-y-4">
                            {t.introText.map((paragraph: string, index: number) => (
                                <p key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* 研究テーマ詳細 */}
                    <div className="space-y-16">
                        {t.researchAreas.map((area: any, index: number) => (
                            <div key={area.id} className={`magic-card ${index % 2 === 1 ? 'bg-primary-light/50' : ''}`}>
                                <h2 className="text-2xl font-display mb-6 text-accent">
                                    {area.title}
                                </h2>

                                <div className="whitespace-pre-line">
                                    {area.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

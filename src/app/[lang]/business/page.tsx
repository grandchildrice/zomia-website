import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'business']);

    return {
        title: `${dict.business.title} | ${dict.common.siteTitle}`,
        description: dict.business.subtitle,
    };
}

export default async function BusinessPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'business']);
    const t = dict.business as any;

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

            {/* サービス紹介セクション */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-12 magic-text">
                        {t.servicesTitle}
                    </h2>

                    <div className="space-y-12">
                        {t.services.map((service: any, index: number) => (
                            <div key={service.id} className={`magic-card ${index % 2 === 1 ? 'bg-primary-light/50' : ''}`}>
                                <h3 className="text-2xl font-display mb-6 text-accent">{service.title}</h3>
                                <div className="whitespace-pre-line">{service.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 導入事例セクション */}
            <section className="py-16 bg-primary-dark/70">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-12 magic-text">
                        {t.caseStudiesTitle}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.caseStudies.map((caseStudy: any) => (
                            <div key={caseStudy.id} className="magic-card h-full">
                                <h3 className="text-xl font-display mb-4 text-accent">{caseStudy.title}</h3>
                                <p className="opacity-80">{caseStudy.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* お問い合わせセクション */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display mb-6 magic-text">
                        {t.contactTitle}
                    </h2>

                    <p className="max-w-2xl mx-auto mb-8 opacity-80">
                        {t.contactDescription}
                    </p>

                    <div className="retro-terminal max-w-md mx-auto p-6 text-left">
                        <div className="text-sm">
                            <span className="text-retro">$</span> ./contact_business.sh<br />
                            <span className="text-magic">{'>'}</span> {t.terminal.securityRequest}<br />
                            <span className="text-magic">{'>'}</span> {t.terminal.redteamRequest}<br />
                            <span className="text-magic">{'>'}</span> {t.terminal.customRequest}<br />
                            <span className="text-retro">$</span> _
                        </div>
                    </div>

                    <Link
                        href={`/${lang}/contact`}
                        className="magic-button inline-block mt-8"
                    >
                        {t.contactButton}
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}

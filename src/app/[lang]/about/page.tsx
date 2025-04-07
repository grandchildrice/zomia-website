import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import Link from 'next/link';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'about']);

    return {
        title: `${dict.about.title} | ${dict.common.siteTitle}`,
        description: dict.about.subtitle,
    };
}

export default async function AboutPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'about']);
    const t = dict.about as any;

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

            {/* ミッションとビジョンセクション */}
            <section className="py-20 bg-primary-light/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="magic-card h-full">
                            <h2 className="text-2xl font-display mb-6 text-accent text-center">{t.missionTitle}</h2>
                            <p className="opacity-80 leading-relaxed">{t.missionDescription}</p>
                        </div>

                        <div className="magic-card h-full">
                            <h2 className="text-2xl font-display mb-6 text-accent text-center">{t.visionTitle}</h2>
                            <p className="opacity-80 leading-relaxed">{t.visionDescription}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* チームセクション */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-16 magic-text">{t.teamTitle}</h2>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                        {t.teamMembers.map((member: any, index: number) => (
                            <div key={index} className="magic-card h-full">
                                <h3 className="text-xl font-display mb-2 text-accent">{member.name}</h3>
                                <div className="text-sm text-accent/70 mb-4">{member.role}</div>
                                <p className="text-sm opacity-80 mb-4">{member.bio}</p>
                                <div className="mt-auto">
                                    <div className="text-xs uppercase tracking-wider text-secondary mb-2">
                                        {lang === 'ja' ? '専門領域' : 'Expertise'}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {member.areas.map((area: string, i: number) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-primary-light/30 px-2 py-1 rounded-full"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 採用セクション */}
            <section className="py-20 bg-primary-dark/70">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display mb-6 magic-text">{t.joinUsTitle}</h2>
                    <p className="max-w-2xl mx-auto mb-12 opacity-80">{t.joinUsDescription}</p>
                    <Link href={`/${lang}/contact`} className="magic-button-enhanced">
                        {t.contactButton}
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}

import PageLayout from '@/components/PageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'community']);

    return {
        title: `${dict.community.title} | ${dict.common.siteTitle}`,
        description: dict.community.subtitle,
    };
}

export default async function CommunityPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'community']);
    const t = dict.community as any;

    // Format date based on locale
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(lang === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

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

            {/* コミュニティ紹介セクション */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-12 magic-text">
                        {t.managedCommunities}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {t.communities.map((community: any) => (
                            <div key={community.id} className="magic-card h-full">
                                <h3 className="text-2xl font-display mb-4 text-accent">{community.title}</h3>
                                <p className="opacity-80">{community.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* イベントセクション */}
            {/* <section className="py-16 bg-primary-light/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-12 magic-text">
                        {t.upcomingEvents}
                    </h2>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {t.events.map((event: any) => (
                            <div key={event.id} className="magic-card hover:translate-x-1 transition-transform duration-300">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="md:w-1/4 mb-4 md:mb-0">
                                        <div className="text-accent font-mono">{event.date}</div>
                                        <div className="text-sm opacity-70">{event.location}</div>
                                    </div>
                                    <div className="md:w-3/4">
                                        <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                                        <p className="opacity-80">{event.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* リソースセクション */}
            {/* <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-display text-center mb-12 magic-text">
                        {t.communityResources}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {t.resources.map((resource: any) => (
                            <div key={resource.id} className="magic-card h-full">
                                <h3 className="text-xl font-display mb-2 text-accent">{resource.title}</h3>
                                <div className="text-xs font-mono text-secondary mb-3">{resource.type}</div>
                                <p className="opacity-80 text-sm">{resource.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="#" className="magic-button">
                            {t.viewAllResources}
                        </a>
                    </div>
                </div>
            </section> */}

            {/* 参加方法セクション */}
            {/* <section className="py-16 bg-primary-dark/70">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-display mb-8 magic-text">
                        {t.joinCommunity}
                    </h2>

                    <p className="max-w-2xl mx-auto mb-8 opacity-80">
                        {t.joinDescription}
                    </p>

                    <div className="retro-terminal max-w-md mx-auto p-6 text-left">
                        <div className="text-sm">
                            <span className="text-retro">$</span> ./join_community.sh<br />
                            <span className="text-magic">{'>'}</span> {t.joinMessages.slack}<br />
                            <span className="text-magic">{'>'}</span> {t.joinMessages.event}<br />
                            <span className="text-magic">{'>'}</span> {t.joinMessages.newsletter}<br />
                            <span className="text-retro">$</span> _
                        </div>
                    </div>

                    <Link
                        href={`/${lang}/contact`}
                        className="magic-button inline-block mt-8"
                    >
                        {t.contactPageLink}
                    </Link>
                </div>
            </section> */}
        </PageLayout>
    );
}

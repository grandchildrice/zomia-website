import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import Image from 'next/image';
import ResearchSVG from '@/components/ResearchSVG';
import BusinessSVG from '@/components/BusinessSVG';
import CommunitySVG from '@/components/CommunitySVG';
import News from '@/components/News';
import { Locale, Params, Dictionary } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';
import AnimatedZomiaLogo from '@/components/LogoSVG';

// Metadata generation
export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common']);

    return {
        title: dict.common.siteTitle,
        description: 'Post-modern Cryptography Research Institute',
    };
}

export default async function HomePage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'home']);
    const common = dict.common as any;
    const t = dict.home as any;

    // モックニュースデータ
    const newsItems = [
        {
            id: '1',
            title: lang === 'ja'
                ? 'ZOMIAが近未来暗号研究所を設立'
                : 'ZOMIA Establishes Post-modern Cryptography Institute',
            date: '2025-01-01',
            excerpt: lang === 'ja'
                ? '近未来暗号研究所「ZOMIA」の設立を発表しました。量子コンピュータ時代に向けた新しい暗号技術の研究開発を進めます。'
                : 'Announced the establishment of the Post-modern Cryptography Institute "ZOMIA". We will advance research and development of new cryptographic technologies for the quantum computing era.'
        },
        {
            id: '2',
            title: lang === 'ja'
                ? 'ゼロ知識証明に関する最新研究成果を発表'
                : 'Latest Research Results on Zero-Knowledge Proofs Announced',
            date: '2025-02-15',
            excerpt: lang === 'ja'
                ? '効率的なゼロ知識証明システムの開発に成功しました。従来の方法と比較して、セキュリティレベルを維持しながら計算コストを50%削減できます。'
                : 'Successfully developed an efficient zero-knowledge proof system. Compared to conventional methods, it can reduce computational costs by 50% while maintaining security levels.'
        }
    ];

    // 日付のフォーマット
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
            {/* 星空背景 */}
            <div id="stars-container" className="fixed inset-0 z-[-1] overflow-hidden" />

            {/* スキャンライン効果 */}
            <div className="scanline"></div>

            {/* CRT効果のオーバーレイ */}
            <div className="crt-effect fixed inset-0 z-[100] pointer-events-none"></div>

            {/* ヒーローセクション */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden magic-bg-enhanced">
                <div className="absolute inset-0 z-[-1]">
                    <div className="magic-circle"></div>
                </div>

                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto" style={{ width: 180, height: 180 }}>
                        <AnimatedZomiaLogo />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display mb-6 magic-text-enhanced glitch-text">
                        {t.hero.title}
                    </h1>

                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-80 typewriter hologram">
                        {t.hero.subtitle}
                    </p>

                    <Link
                        href={`/${lang}/about`}
                        className="magic-button-enhanced text-lg"
                    >
                        {t.hero.cta}
                    </Link>
                </div>
            </section>

            {/* イントロセクション */}
            <section className="py-24 bg-primary-dark cyberpunk-grid">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-display text-center mb-8 magic-text-enhanced text-3d">
                            {t.intro.title}
                        </h2>

                        <p className="text-lg text-center leading-relaxed opacity-80 magic-card-enhanced p-6">
                            {t.intro.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* 研究テーマセクション */}
            <section className="py-24 magic-particles">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display text-center mb-4 magic-text-enhanced">
                        {t.research.title}
                    </h2>

                    <p className="text-center max-w-3xl mx-auto mb-16 opacity-80">
                        {t.research.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 glow-effect">
                                <ResearchSVG />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {t.research.areas.map((area: any, index: number) => (
                                <div key={index} className="magic-card-enhanced hover:translate-x-1 transition-transform duration-300">
                                    <h3 className="text-xl font-display mb-2 text-accent hologram">{area.title}</h3>
                                    <p className="opacity-80">{area.description}</p>
                                </div>
                            ))}

                            <div className="text-right">
                                <Link
                                    href={`/${lang}/research`}
                                    className="text-accent hover:underline magic-text"
                                >
                                    {lang === 'ja' ? 'もっと見る →' : 'Learn more →'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 活動内容セクション */}
            <section className="py-24 bg-primary-light/50 constellation">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display text-center mb-16 magic-text-enhanced">
                        {t.activities.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.activities.items.map((item: any, index: number) => (
                            <div key={index} className="magic-card-enhanced h-full">
                                <Link href={index === 0 ? `/${lang}/research` : index === 1 ? `/${lang}/business` : `/${lang}/community`}>

                                    <div className="flex justify-center mb-6">
                                        <div className="w-48 h-48 glow-effect opacity-40">
                                            {index === 0 && <ResearchSVG />}
                                            {index === 1 && <BusinessSVG />}
                                            {index === 2 && <CommunitySVG />}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-display text-center mb-4 text-accent hologram">
                                        {item.title}
                                    </h3>
                                    <p className="opacity-80 text-center">
                                        {item.description}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ニュースセクション */}
            <section className="py-24 cyberpunk-grid">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-display text-center mb-16 magic-text-enhanced glitch-text">
                        {t.news.title}
                    </h2>

                    <div className="max-w-4xl mx-auto space-y-8">
                        <News
                            locale={lang as Locale}
                            showHeader={false}
                            limit={3}
                        />
                    </div>
                </div>
            </section>

            {/* お問い合わせセクション */}
            <section className="py-24 bg-primary-dark magic-bg-enhanced">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-display mb-6 magic-text-enhanced">
                        {t.contact.title}
                    </h2>

                    <p className="max-w-2xl mx-auto mb-12 opacity-80 text-lg retro-terminal-enhanced p-6">
                        {t.contact.description}
                    </p>

                    <Link
                        href={`/${lang}/contact`}
                        className="magic-button-enhanced text-lg"
                    >
                        {t.contact.button}
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}

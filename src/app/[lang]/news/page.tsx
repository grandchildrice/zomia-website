import PageLayout from '@/components/PageLayout';
import News from '@/components/News';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'news']);

    return {
        title: `${dict.news.title} | ${dict.common.siteTitle}`,
        description: dict.news.subtitle,
    };
}

export default async function NewsPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'news']);
    const t = dict.news as any;

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

            {/* ニュース一覧セクション */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <News
                        locale={lang as Locale}
                        showHeader={false}
                    />
                </div>
            </section>

            {/* ニュースレター登録セクション */}
            {/* <section className="py-16 bg-primary-light/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-display mb-6 magic-text">
                        {lang === 'ja' ? 'ニュースレター登録' : 'Newsletter Subscription'}
                    </h2>

                    <p className="max-w-2xl mx-auto mb-8 opacity-80">
                        {lang === 'ja'
                            ? '最新の研究成果やイベント情報をメールでお届けします。下記フォームからご登録ください。'
                            : 'Receive the latest research results and event information by email. Please register from the form below.'}
                    </p>

                    <div className="max-w-md mx-auto">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder={lang === 'ja' ? 'メールアドレス' : 'Email address'}
                                className="flex-grow px-4 py-2 bg-primary-light border border-accent/30 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button className="magic-button rounded-l-none">
                                {lang === 'ja' ? '登録' : 'Subscribe'}
                            </button>
                        </div>
                        <p className="mt-4 text-xs opacity-60">
                            {lang === 'ja'
                                ? '※ 登録は任意です。いつでも解除できます。'
                                : '※ Registration is optional. You can unsubscribe at any time.'}
                        </p>
                    </div>
                </div>
            </section> */}
        </PageLayout>
    );
}

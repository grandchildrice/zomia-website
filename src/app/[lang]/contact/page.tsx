import PageLayout from '@/components/PageLayout';
import { Locale, Params } from '@/types';
import { getDictionary } from '@/lib/i18n-utils';

export async function generateMetadata({ params: { lang } }: { params: Params }) {
    const dict = await getDictionary(lang as Locale, ['common', 'contact']);

    return {
        title: `${dict.contact.title} | ${dict.common.siteTitle}`,
        description: dict.contact.subtitle,
    };
}

export default async function ContactPage({ params: { lang } }: { params: Params }) {
    // Get dictionary content
    const dict = await getDictionary(lang as Locale, ['common', 'contact']);
    const t = dict.contact as any;

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

            {/* お問い合わせフォームセクション */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="magic-card">
                            <h2 className="text-2xl font-display mb-8 text-accent text-center">
                                {t.formTitle}
                            </h2>

                            <p className="mb-8 opacity-80 text-center">
                                {t.formIntro}
                            </p>

                            <div className="cryptic-text text-center mb-8">
                                {lang === 'ja'
                                    ? '※ このフォームは暗号化されています。情報は安全に保護されます。'
                                    : '※ This form is encrypted. Your information will be securely protected.'}
                            </div>

                            <iframe src="https://grandchildrice.notion.site/ebd/1ced05af0d5a809eafdaee923bf2ecaa" width="100%" height="600" frameBorder="0" allowFullScreen />

                            <div className="mt-8 text-center text-sm opacity-70">
                                <p>
                                    {lang === 'ja'
                                        ? '※ このフォームはNotionと連携しています。送信された情報はNotionデータベースに保存されます。'
                                        : '※ This form is integrated with Notion. Submitted information will be stored in a Notion database.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* その他の連絡方法セクション */}
            <section className="py-16 bg-primary-light/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-display mb-8 magic-text">
                        {t.contactMethods}
                    </h2>

                    <div className="max-w-2xl mx-auto">
                        <div className="retro-terminal p-6 text-left mb-8">
                            <div className="text-sm">
                                <span className="text-retro">$</span> ./contact_info.sh<br />
                                <span className="text-magic">{'>'}</span> {t.email}: kingmasatojames{'@'}gmail.com<br />
                                <span className="text-magic">{'>'}</span> {lang === 'ja' ? '所在地: 秘密' : 'Location: Classified'}<br />
                                <span className="text-magic">{'>'}</span> {lang === 'ja' ? '応答時間: 通常3営業日以内' : 'Response time: Usually within 3 business days'}<br />
                                <span className="text-retro">$</span> _
                            </div>
                        </div>

                        <p className="opacity-80">
                            {lang === 'ja'
                                ? '機密性の高い内容については、PGP暗号化されたメールでのお問い合わせをお勧めします。'
                                : 'For highly confidential matters, we recommend contacting us via PGP-encrypted email.'}
                        </p>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

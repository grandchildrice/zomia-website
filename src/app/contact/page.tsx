'use client';
import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';

interface PageProps {
  params: {
    locale?: string;
  };
}

export default function ContactPage({ params }: PageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const title = locale === 'ja' ? 'お問い合わせ' : 'Contact';
  const subtitle = locale === 'ja'
    ? 'ZOMIAへのお問い合わせはこちらから'
    : 'Contact ZOMIA here';

  return (
    <PageLayout locale={locale}>
      {/* ヒーローセクション */}
      <section className="pt-24 pb-16 bg-primary-dark">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display text-center mb-6 magic-text">
            {title}
          </h1>
          <p className="text-center max-w-3xl mx-auto opacity-80 text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      {/* お問い合わせフォームセクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="magic-card">
              <h2 className="text-2xl font-display mb-8 text-accent text-center">
                {locale === 'ja' ? 'お問い合わせフォーム' : 'Contact Form'}
              </h2>

              <p className="mb-8 opacity-80 text-center">
                {locale === 'ja'
                  ? '以下のフォームに必要事項をご記入の上、送信してください。通常3営業日以内にご返信いたします。'
                  : 'Please fill out the form below and submit it. We will usually respond within 3 business days.'}
              </p>

              <div className="cryptic-text text-center mb-8">
                {locale === 'ja'
                  ? '※ このフォームは暗号化されています。情報は安全に保護されます。'
                  : '※ This form is encrypted. Your information will be securely protected.'}
              </div>

              <iframe src="https://grandchildrice.notion.site/ebd/1ced05af0d5a809eafdaee923bf2ecaa" width="100%" height="600" frameBorder="0" allowFullScreen />

              <div className="mt-8 text-center text-sm opacity-70">
                <p>
                  {locale === 'ja'
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
            {locale === 'ja' ? 'その他の連絡方法' : 'Other Contact Methods'}
          </h2>

          <div className="max-w-2xl mx-auto">
            <div className="retro-terminal p-6 text-left mb-8">
              <div className="text-sm">
                <span className="text-retro">$</span> ./contact_info.sh<br />
                <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'メール: kingmasatojames{at}gmail.com' : 'Email: kingmasatojames{at}gmail.com'}<br />
                <span className="text-magic">{'>'}</span> {locale === 'ja' ? '所在地: 秘密' : 'Location: Classified'}<br />
                <span className="text-magic">{'>'}</span> {locale === 'ja' ? '応答時間: 通常3営業日以内' : 'Response time: Usually within 3 business days'}<br />
                <span className="text-retro">$</span> _
              </div>
            </div>

            <p className="opacity-80">
              {locale === 'ja'
                ? '機密性の高い内容については、PGP暗号化されたメールでのお問い合わせをお勧めします。'
                : 'For highly confidential matters, we recommend contacting us via PGP-encrypted email.'}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

'use client';

import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import { useNotionAPI } from '@/lib/notionAPI';

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

  const { submitContactForm } = useNotionAPI();

  // フォーム状態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: false });

    try {
      const success = await submitContactForm(formData, locale);

      if (success) {
        setFormStatus({ submitting: false, success: true, error: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({ submitting: false, success: false, error: true });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ submitting: false, success: false, error: true });
    }
  };

  // お問い合わせカテゴリ
  const contactCategories = locale === 'ja'
    ? [
      { value: '', label: 'カテゴリを選択してください' },
      { value: 'research', label: '研究に関するお問い合わせ' },
      { value: 'business', label: 'ビジネスに関するお問い合わせ' },
      { value: 'community', label: 'コミュニティに関するお問い合わせ' },
      { value: 'other', label: 'その他' }
    ]
    : [
      { value: '', label: 'Select a category' },
      { value: 'research', label: 'Research Inquiry' },
      { value: 'business', label: 'Business Inquiry' },
      { value: 'community', label: 'Community Inquiry' },
      { value: 'other', label: 'Other' }
    ];

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

              <iframe src="https://grandchildrice.notion.site/ebd/1ced05af0d5a809eafdaee923bf2ecaa" width="100%" height="600" frameborder="0" allowfullscreen />
              {/* {formStatus.success ? (
                <div className="text-center py-8">
                  <div className="text-accent text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-medium mb-4">
                    {locale === 'ja' ? 'お問い合わせを受け付けました' : 'Your inquiry has been received'}
                  </h3>
                  <p className="opacity-80 mb-6">
                    {locale === 'ja'
                      ? 'お問い合わせありがとうございます。内容を確認の上、担当者より折り返しご連絡いたします。'
                      : 'Thank you for your inquiry. We will review your message and get back to you soon.'}
                  </p>
                  <button
                    onClick={() => setFormStatus({ submitting: false, success: false, error: false })}
                    className="magic-button"
                  >
                    {locale === 'ja' ? '新しいお問い合わせ' : 'New Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStatus.error && (
                    <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-md mb-6">
                      <p>
                        {locale === 'ja'
                          ? 'エラーが発生しました。しばらく経ってからもう一度お試しください。'
                          : 'An error occurred. Please try again later.'}
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {locale === 'ja' ? 'お名前' : 'Name'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-primary-light border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={formStatus.submitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {locale === 'ja' ? 'メールアドレス' : 'Email'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-primary-light border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={formStatus.submitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {locale === 'ja' ? 'お問い合わせカテゴリ' : 'Inquiry Category'}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-primary-light border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={formStatus.submitting}
                    >
                      {contactCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {locale === 'ja' ? 'お問い合わせ内容' : 'Message'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-primary-light border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={formStatus.submitting}
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="magic-button"
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting
                        ? (locale === 'ja' ? '送信中...' : 'Submitting...')
                        : (locale === 'ja' ? '送信する' : 'Submit')}
                    </button>
                  </div>
                </form>
              )} */}

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

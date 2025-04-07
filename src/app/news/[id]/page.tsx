'use client';

import { useState, useEffect } from 'react';
import { Locale } from '../../../types';
import { useNotionAPI } from '@/lib/notionAPI';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

interface NewsDetailPageProps {
  params: {
    id: string;
    locale?: string;
  };
}

interface NewsDetail {
  id: string;
  title: string;
  date: string;
  category?: string;
  topic?: string;
  content?: string;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const { fetchNewsById } = useNotionAPI();
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNewsDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await fetchNewsById(params.id, locale);
        setNewsDetail(news);
      } catch (err) {
        console.error('Failed to load news detail:', err);
        setError(locale === 'ja' ? 'ニュース記事の読み込みに失敗しました' : 'Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetail();
  }, [fetchNewsById, params.id, locale]);

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return locale === 'ja'
      ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      : new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
  };

  // マークダウンっぽいテキストをHTMLに変換する簡易関数
  const formatContent = (content?: string) => {
    if (!content) return '';

    // 段落分割
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

    return paragraphs.map((paragraph, index) => {
      // 見出し
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-display mt-8 mb-4">{paragraph.substring(2)}</h2>;
      } else if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-display mt-6 mb-3">{paragraph.substring(3)}</h3>;
      } else if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-display mt-5 mb-2">{paragraph.substring(4)}</h4>;
      }

      // リスト項目がある場合
      if (paragraph.includes('\n- ')) {
        const [intro, ...listItems] = paragraph.split('\n- ');
        return (
          <div key={index}>
            {intro && <p className="mb-2">{intro}</p>}
            <ul className="list-disc list-inside mb-4 space-y-1">
              {listItems.map((item, i) => (
                <li key={i} className="ml-4">{item}</li>
              ))}
            </ul>
          </div>
        );
      }

      // 通常の段落
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  return (
    <PageLayout locale={locale}>
      <section className="pt-24 pb-16 bg-primary-dark">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
              <p className="mt-4 opacity-80">
                {locale === 'ja' ? '記事を読み込んでいます...' : 'Loading article...'}
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-xl text-red-400 mb-4">⚠️</div>
              <p className="mb-6">{error}</p>
              <Link href={`/${locale === 'en' ? 'en/' : ''}news`} className="magic-button">
                {locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list'}
              </Link>
            </div>
          ) : newsDetail ? (
            <div>
              <h1 className="text-3xl md:text-4xl font-display text-center mb-6 magic-text">
                {newsDetail.title}
              </h1>
              <div className="flex justify-center items-center gap-4 mb-8 text-sm opacity-70">
                <div className="font-mono">{formatDate(newsDetail.date)}</div>
                {newsDetail.category && (
                  <div className="px-3 py-1 bg-primary-light/30 rounded-full">
                    {newsDetail.category}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="mb-6">
                {locale === 'ja' ? '記事が見つかりませんでした' : 'Article not found'}
              </p>
              <Link href={`/${locale === 'en' ? 'en/' : ''}news`} className="magic-button">
                {locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {!loading && !error && newsDetail && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="magic-card max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                {formatContent(newsDetail.content)}
              </div>

              <div className="mt-12 pt-8 border-t border-primary-light/20">
                <Link href={`/${locale === 'en' ? 'en/' : ''}news`} className="text-accent hover:underline">
                  ← {locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
}

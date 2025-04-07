'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useNotionAPI } from '@/lib/notionAPI';
import { Locale } from '../types';

interface NewsProps {
    locale: Locale;
    limit?: number;
    showHeader?: boolean;
    className?: string;
}

interface NewsItem {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
    category?: string;
    topic?: string;
}

export default function News({
    locale,
    limit,
    showHeader = true,
    className = '',
}: NewsProps) {
    const { fetchNews } = useNotionAPI();
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const news = await fetchNews(locale);
                // Apply limit if provided
                const limitedNews = limit ? news.slice(0, limit) : news;
                setNewsItems(limitedNews);
            } catch (error) {
                console.error('Failed to load news:', error);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [fetchNews, locale, limit]);

    // 日付のフォーマット
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return locale === 'ja'
            ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
            : new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
    };

    const title = locale === 'ja' ? 'ニュース' : 'News';
    const subtitle = locale === 'ja'
        ? '最新の研究成果やイベント情報'
        : 'Latest research results and event information';
    const noNewsText = locale === 'ja'
        ? 'ニュース記事が見つかりませんでした。後でもう一度お試しください。'
        : 'No news articles found. Please try again later.';
    const loadingText = locale === 'ja' ? 'ニュースを読み込んでいます...' : 'Loading news...';
    const readMoreText = locale === 'ja' ? '続きを読む →' : 'Read more →';
    const viewAllText = locale === 'ja' ? '全て見る' : 'View all';

    return (
        <div className={className}>
            {showHeader && (
                <div className="mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-display magic-text-enhanced glitch-text">
                        {title}
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto opacity-80 text-lg">
                        {subtitle}
                    </p>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-accent border-t-transparent rounded-full"></div>
                    <p className="mt-4 opacity-80">
                        {loadingText}
                    </p>
                </div>
            ) : newsItems.length > 0 ? (
                <div className="max-w-4xl mx-auto space-y-8">
                    {newsItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${locale === 'en' ? 'en/' : ''}news/${item.id}`}
                            className="block"
                        >
                            <div className="magic-card hover:translate-x-1 transition-transform duration-300">
                                <div className="text-sm font-mono text-accent mb-2">
                                    {formatDate(item.date)}
                                </div>
                                <h2 className="text-xl md:text-2xl font-display mb-3">
                                    {item.title}
                                </h2>
                                <p className="opacity-80">
                                    {item.excerpt}
                                </p>
                                <div className="mt-4 text-sm text-accent">
                                    {readMoreText}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {limit && newsItems.length >= limit && (
                        <div className="text-center mt-8">
                            <Link href={`/${locale === 'en' ? 'en/' : ''}news`} className="magic-button">
                                {viewAllText}
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="retro-terminal max-w-md mx-auto p-6">
                        <div className="text-sm">
                            <span className="text-retro">$</span> ./fetch_news.sh<br />
                            <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'エラー: ニュースが見つかりません' : 'Error: No news found'}<br />
                            <span className="text-retro">$</span> _
                        </div>
                    </div>
                    <p className="mt-8 opacity-80">
                        {noNewsText}
                    </p>
                </div>
            )}
        </div>
    );
}

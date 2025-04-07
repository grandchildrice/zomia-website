'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { useNotionAPI } from '@/lib/notionAPI';
import Link from 'next/link';
import Image from 'next/image';
import { getClientDictionary } from '@/lib/client-i18n-utils';

interface NewsDetailProps {
    id: string;
    locale: Locale;
}

interface NewsDetail {
    id: string;
    title: string;
    date: string;
    category?: string;
    topic?: string;
    content?: string;
    images?: NotionImage[];
    links?: NotionLink[];
}

interface NotionImage {
    url: string;
    caption?: string;
    position: number; // Position in the content where the image should appear
}

interface NotionLink {
    text: string;
    url: string;
    position: number; // Position in the content where the link should appear
    length: number; // Length of the text to be replaced with link
}

export default function NewsDetail({ id, locale }: NewsDetailProps) {
    const { fetchNewsById } = useNotionAPI();
    const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [t, setT] = useState<any>({});

    // Load translations
    useEffect(() => {
        const loadTranslations = async () => {
            const dict = await getClientDictionary(locale, ['common', 'news']);
            setT(dict.news);
        };

        loadTranslations();
    }, [locale]);

    useEffect(() => {
        const loadNewsDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const news = await fetchNewsById(id, locale);
                setNewsDetail(news);
            } catch (err) {
                console.error('Failed to load news detail:', err);
                setError(locale === 'ja' ? 'ニュース記事の読み込みに失敗しました' : 'Failed to load news article');
            } finally {
                setLoading(false);
            }
        };

        loadNewsDetail();
    }, [fetchNewsById, id, locale]);

    // 日付のフォーマット
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Process content with images and links
    const formatContent = (content?: string, images?: NotionImage[], links?: NotionLink[]) => {
        if (!content) return '';

        // 段落分割
        const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

        // Track total character count to determine image positions
        let characterCount = 0;
        let imageIndex = 0;

        const renderedContent = paragraphs.map((paragraph, index) => {
            // Calculate current paragraph position in the whole content
            const paragraphStartPosition = characterCount;
            characterCount += paragraph.length + 2; // +2 for '\n\n'

            // Find images that should appear after this paragraph
            const paragraphImages = images?.filter(img =>
                img.position >= paragraphStartPosition &&
                img.position < characterCount
            ) || [];

            // Process links in this paragraph
            let paragraphWithLinks = paragraph;
            let linkOffsets = 0;

            // If links exist, apply them to this paragraph
            if (links && links.length > 0) {
                const paragraphLinks = links.filter(link =>
                    link.position >= paragraphStartPosition &&
                    link.position + link.length <= characterCount
                ).sort((a, b) => a.position - b.position);

                // Apply links to paragraph text
                paragraphLinks.forEach(link => {
                    const linkPositionInParagraph = link.position - paragraphStartPosition + linkOffsets;
                    const beforeLink = paragraphWithLinks.substring(0, linkPositionInParagraph);
                    const afterLink = paragraphWithLinks.substring(linkPositionInParagraph + link.length);
                    paragraphWithLinks = beforeLink + `<a href="${link.url}">${link.text}</a>` + afterLink;
                    linkOffsets += (`<a href="${link.url}"></a>`.length); // Adjust for added HTML tags
                });
            }

            // Render the paragraph based on type
            let paragraphElement;

            // 見出し
            if (paragraph.startsWith('# ')) {
                paragraphElement = <h2 key={`p-${index}`} className="text-2xl font-display mt-8 mb-4">
                    {paragraphWithLinks.includes('<a href=')
                        ? <span dangerouslySetInnerHTML={{ __html: paragraphWithLinks.substring(2) }} />
                        : paragraphWithLinks.substring(2)}
                </h2>;
            } else if (paragraph.startsWith('## ')) {
                paragraphElement = <h3 key={`p-${index}`} className="text-xl font-display mt-6 mb-3">
                    {paragraphWithLinks.includes('<a href=')
                        ? <span dangerouslySetInnerHTML={{ __html: paragraphWithLinks.substring(3) }} />
                        : paragraphWithLinks.substring(3)}
                </h3>;
            } else if (paragraph.startsWith('### ')) {
                paragraphElement = <h4 key={`p-${index}`} className="text-lg font-display mt-5 mb-2">
                    {paragraphWithLinks.includes('<a href=')
                        ? <span dangerouslySetInnerHTML={{ __html: paragraphWithLinks.substring(4) }} />
                        : paragraphWithLinks.substring(4)}
                </h4>;
            }
            // リスト項目がある場合
            else if (paragraph.includes('\n- ')) {
                const [intro, ...listItems] = paragraph.split('\n- ');
                paragraphElement = (
                    <div key={`p-${index}`}>
                        {intro && <p className="mb-2">
                            {paragraphWithLinks.includes('<a href=')
                                ? <span dangerouslySetInnerHTML={{ __html: intro }} />
                                : intro}
                        </p>}
                        <ul className="list-disc list-inside mb-4 space-y-1">
                            {listItems.map((item, i) => (
                                <li key={i} className="ml-4">
                                    {paragraphWithLinks.includes('<a href=') && item.includes('<a href=')
                                        ? <span dangerouslySetInnerHTML={{ __html: item }} />
                                        : item}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            }
            // 通常の段落
            else {
                paragraphElement = <p key={`p-${index}`} className="mb-4">
                    {paragraphWithLinks.includes('<a href=')
                        ? <span dangerouslySetInnerHTML={{ __html: paragraphWithLinks }} />
                        : paragraphWithLinks}
                </p>;
            }

            // If there are images that should appear after this paragraph, add them
            if (paragraphImages.length > 0) {
                return [
                    paragraphElement,
                    ...paragraphImages.map((image, imgIndex) => (
                        <figure key={`img-${index}-${imgIndex}`} className="my-6">
                            <div className="relative w-full h-auto max-w-2xl mx-auto rounded-lg overflow-hidden">
                                <Image
                                    src={image.url}
                                    alt={image.caption || 'News image'}
                                    width={800}
                                    height={500}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {image.caption && (
                                <figcaption className="text-center text-sm mt-2 opacity-70">{image.caption}</figcaption>
                            )}
                        </figure>
                    ))
                ];
            }

            return paragraphElement;
        });

        // Flatten the array since some elements might return arrays (paragraph + images)
        return renderedContent.flat();
    };

    return (
        <>
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
                            <Link href={`/${locale}/news`} className="magic-button">
                                {t.backToNewsList || (locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list')}
                            </Link>
                        </div>
                    ) : newsDetail ? (
                        <div>
                            <h1 className="text-3xl md:text-4xl font-display text-center mb-6 magic-text">
                                {newsDetail.title}
                            </h1>
                            <div className="flex justify-center items-center gap-4 mb-8 text-sm opacity-70">
                                <div className="font-mono">
                                    {t.publishedOn || (locale === 'ja' ? '投稿日：' : 'Published on: ')}
                                    {formatDate(newsDetail.date)}
                                </div>
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
                            <Link href={`/${locale}/news`} className="magic-button">
                                {t.backToNewsList || (locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list')}
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
                                {formatContent(newsDetail.content, newsDetail.images, newsDetail.links)}
                            </div>

                            <div className="mt-12 pt-8 border-t border-primary-light/20">
                                <Link href={`/${locale}/news`} className="text-accent hover:underline">
                                    ← {t.backToNewsList || (locale === 'ja' ? 'ニュース一覧に戻る' : 'Back to news list')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

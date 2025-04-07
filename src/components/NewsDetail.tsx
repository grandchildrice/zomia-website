'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/types';
import { useNotionAPI, NewsItem, NotionImage, NotionLink } from '@/lib/notionAPI';
import Link from 'next/link';
import Image from 'next/image';
import { getClientDictionary } from '@/lib/client-i18n-utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

interface NewsDetailProps {
    id: string;
    locale: Locale;
}

export default function NewsDetail({ id, locale }: NewsDetailProps) {
    const { fetchNewsById } = useNotionAPI();
    const [newsDetail, setNewsDetail] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [t, setT] = useState<any>({});
    const [processedContent, setProcessedContent] = useState<string>('');

    // Load translations
    useEffect(() => {
        const loadTranslations = async () => {
            const dict = await getClientDictionary(locale, ['common', 'news']);
            setT(dict.news);
        };

        loadTranslations();
    }, [locale]);

    // Load news detail
    useEffect(() => {
        const loadNewsDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const news = await fetchNewsById(id, locale);
                setNewsDetail(news);

                // Process content to include images and links at proper positions
                if (news && news.content) {
                    setProcessedContent(processNotionContent(
                        news.content,
                        news.images,
                        news.links
                    ));
                }
            } catch (err) {
                console.error('Failed to load news detail:', err);
                setError(locale === 'ja' ? 'ニュース記事の読み込みに失敗しました' : 'Failed to load news article');
            } finally {
                setLoading(false);
            }
        };

        loadNewsDetail();
    }, [fetchNewsById, id, locale]);

    // Format date based on locale
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Process Notion content to ensure proper markdown formatting
    const processNotionContent = (
        content: string,
        images?: NotionImage[],
        links?: NotionLink[]
    ): string => {
        if (!content) return '';

        let processedContent = content;

        // Ensure list items are properly formatted with newlines between items
        // This fixes issues with bullet lists not being properly recognized
        processedContent = processedContent
            .replace(/^- (.*?)$\n^- /gm, '- $1\n- ')
            .replace(/^1\. (.*?)$\n^1\. /gm, '1. $1\n1. ');

        // Make sure there's proper spacing between different content blocks
        // This is crucial for markdown parsers to correctly identify content types
        processedContent = processedContent
            .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
            .replace(/\n\n- /g, '\n\n- ') // Ensure lists have proper preceding newlines
            .replace(/\n\n# /g, '\n\n# ') // Ensure headers have proper preceding newlines
            .replace(/\n\n## /g, '\n\n## ')
            .replace(/\n\n### /g, '\n\n### ');

        // Enhance bold formatting to ensure it's properly recognized
        processedContent = processedContent
            .replace(/\*\*(.*?)\*\*/g, '**$1**') // Ensure bold with ** is consistent
            .replace(/__(.*?)__/g, '**$1**');    // Convert underscores to asterisks for consistency

        // Process links - Must be done before images to maintain correct positions
        if (links && links.length > 0) {
            // Sort links in reverse order to prevent position shifting
            // This way we process from end of text to beginning
            const sortedLinks = [...links].sort((a, b) => b.position - a.position);

            for (const link of sortedLinks) {
                const before = processedContent.substring(0, link.position);
                const linkText = processedContent.substring(link.position, link.position + link.length);
                const after = processedContent.substring(link.position + link.length);

                // Convert to markdown link format: [text](url)
                processedContent = before + `[${linkText}](${link.url})` + after;
            }
        }

        // Process images
        if (images && images.length > 0) {
            // Create a copy of the images array and sort by position
            const sortedImages = [...images].sort((a, b) => a.position - b.position);

            // Start with an offset of 0 - this will increase as we insert images
            let offset = 0;

            for (const image of sortedImages) {
                // Adjust position based on previous inserts
                const adjustedPosition = image.position + offset;

                // Find the nearest paragraph end to insert the image after
                // Look for double newlines which indicate paragraph boundaries
                let insertPosition = processedContent.indexOf('\n\n', adjustedPosition);
                if (insertPosition === -1) {
                    // If no paragraph boundary is found, add to the end
                    insertPosition = processedContent.length;
                } else {
                    // Move past the newlines
                    insertPosition += 2;
                }

                // Create markdown for the image
                const imageMarkdown = `![${image.caption || 'Image'}](${image.url})${image.caption ? `\n*${image.caption}*` : ''}\n\n`;

                // Insert the image markdown at the determined position
                processedContent =
                    processedContent.substring(0, insertPosition) +
                    imageMarkdown +
                    processedContent.substring(insertPosition);

                // Update offset for future image inserts
                offset += imageMarkdown.length;
            }
        }

        return processedContent;
    };

    // Custom components for ReactMarkdown
    const MarkdownComponents = {
        // Custom image component with Next.js Image
        img: ({ node, alt, src, ...props }: any) => (
            <figure className="my-6">
                <div className="relative w-full h-auto max-w-2xl mx-auto rounded-lg overflow-hidden">
                    <Image
                        src={src}
                        alt={alt || 'News image'}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                    />
                </div>
                {alt && alt !== 'Image' && (
                    <figcaption className="text-center text-sm mt-2 opacity-70">{alt}</figcaption>
                )}
            </figure>
        ),
        // Headings with appropriate styling
        h1: ({ node, children, ...props }: any) => (
            <h1 className="text-3xl font-display mt-10 mb-4 font-black" {...props}>
                {children}
            </h1>
        ),
        h2: ({ node, children, ...props }: any) => (
            <h2 className="text-2xl font-display mt-8 mb-4 font-black" {...props}>
                {children}
            </h2>
        ),
        h3: ({ node, children, ...props }: any) => (
            <h3 className="text-xl font-display mt-6 mb-3 font-black" {...props}>
                {children}
            </h3>
        ),
        // Custom links with clear styling
        a: ({ node, children, href, ...props }: any) => (
            <a
                href={href}
                className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-light hover:decoration-2 transition-all duration-200"
                target={href.startsWith('http') ? "_blank" : undefined}
                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                {...props}
            >
                {children}
            </a>
        ),
        // Regular content elements
        p: ({ node, children, ...props }: any) => (
            <p className="mb-4" {...props}>
                {children}
            </p>
        ),
        strong: ({ node, children, ...props }: any) => (
            <strong className="font-extrabold text-accent-light" {...props}>
                {children}
            </strong>
        ),
        ul: ({ node, children, ...props }: any) => (
            <ul className="list-disc mb-4 space-y-1 ml-6" {...props}>
                {children}
            </ul>
        ),
        ol: ({ node, children, ...props }: any) => (
            <ol className="list-decimal mb-4 space-y-1 ml-6" {...props}>
                {children}
            </ol>
        ),
        li: ({ node, children, ...props }: any) => (
            <li className="mb-1" {...props}>
                {children}
            </li>
        ),
        // Tables styling
        table: ({ node, children, ...props }: any) => (
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),
        thead: ({ node, children, ...props }: any) => (
            <thead className="bg-primary-light/10" {...props}>
                {children}
            </thead>
        ),
        th: ({ node, children, ...props }: any) => (
            <th className="p-2 border border-primary-light/20 text-left font-extrabold" {...props}>
                {children}
            </th>
        ),
        td: ({ node, children, ...props }: any) => (
            <td className="p-2 border border-primary-light/20" {...props}>
                {children}
            </td>
        ),
        // Special styling for blockquotes
        blockquote: ({ node, children, ...props }: any) => (
            <blockquote className="pl-4 border-l-4 border-accent/50 italic my-6" {...props}>
                {children}
            </blockquote>
        ),
        // Code blocks with syntax highlighting
        code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
                <pre className="bg-primary-light/10 p-4 rounded-lg overflow-x-auto my-6">
                    <code className={`${match ? `language-${match[1]}` : ''} text-sm`} {...props}>
                        {children}
                    </code>
                </pre>
            ) : (
                <code className="bg-primary-light/20 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                </code>
            );
        }
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
                            <h1 className="text-3xl md:text-4xl font-display text-center mb-6 magic-text font-black">
                                {newsDetail.title}
                            </h1>
                            <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-sm opacity-70">
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
                            <div className="prose prose-invert prose-headings:font-black prose-img:rounded-lg prose-img:my-8 max-w-none">
                                <ReactMarkdown
                                    components={MarkdownComponents}
                                    remarkPlugins={[remarkGfm, remarkMath]}
                                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                                >
                                    {processedContent}
                                </ReactMarkdown>
                            </div>

                            <div className="mt-12 pt-8 border-t border-primary-light/20">
                                <Link href={`/${locale}/news`} className="text-accent hover:underline underline-offset-2">
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
'use client';

import { useState, useEffect, useRef } from 'react';
import { Locale } from '@/types';
import { useNotionAPI, NewsItem, NotionImage, NotionLink, NotionEmbed } from '@/lib/notionAPI';
import Link from 'next/link';
import Image from 'next/image';
import { getClientDictionary } from '@/lib/client-i18n-utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface NewsDetailProps {
    id: string;
    locale: Locale;
}

// Twitter Embed Component
const TwitterEmbed = ({ url }: { url: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const embedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadTwitterWidget = async () => {
            // Check if Twitter widgets script is already loaded
            if (!(window as any).twttr) {
                // Load Twitter widgets script
                const script = document.createElement('script');
                script.src = 'https://platform.twitter.com/widgets.js';
                script.async = true;
                script.onload = () => {
                    setIsLoaded(true);
                };
                document.head.appendChild(script);
            } else {
                setIsLoaded(true);
            }
        };

        loadTwitterWidget();
    }, []);

    useEffect(() => {
        if (isLoaded && embedRef.current && (window as any).twttr) {
            // Clear the container and create the tweet
            embedRef.current.innerHTML = '';
            
            (window as any).twttr.widgets.createTweet(
                getTweetId(url),
                embedRef.current,
                {
                    theme: 'dark',
                    width: 'auto',
                    align: 'center'
                }
            );
        }
    }, [isLoaded, url]);

    const getTweetId = (tweetUrl: string): string => {
        // Extract tweet ID from URL
        const matches = tweetUrl.match(/status\/(\d+)/);
        return matches ? matches[1] : '';
    };

    return (
        <div className="my-8 flex justify-center">
            <div ref={embedRef} className="w-full max-w-lg">
                {!isLoaded && (
                    <div className="p-4 border border-accent/30 rounded-lg bg-accent/5 text-center">
                        <p className="text-sm text-accent/80 mb-2">Loading tweet...</p>
                        <a
                            href={url}
                            className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-light hover:decoration-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {url}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

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

                // Process content to include images, links, and embeds at proper positions
                if (news && news.content) {
                    setProcessedContent(processNotionContent(
                        news.content,
                        news.images,
                        news.links,
                        news.embeds
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
        links?: NotionLink[],
        embeds?: NotionEmbed[]
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

        // Fix code blocks to ensure proper markdown formatting
        processedContent = processedContent
            .replace(/```([a-zA-Z0-9-_]*)\n([\s\S]*?)```/g, (match, lang, code) => {
                // Remove language info from the visible content but preserve it for syntax highlighting
                return '```' + lang + '\n' + code.trim() + '\n```';
            })
            .replace(/`([^`]+)`/g, '`$1`'); // Ensure inline code is properly formatted


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

        // Process images and embeds together, maintaining correct order
        const mediaItems: Array<{
            type: 'image' | 'embed';
            position: number;
            data: NotionImage | NotionEmbed;
        }> = [];

        // Add images to media items
        if (images && images.length > 0) {
            images.forEach(image => {
                mediaItems.push({
                    type: 'image',
                    position: image.position,
                    data: image
                });
            });
        }

        // Add embeds to media items
        if (embeds && embeds.length > 0) {
            embeds.forEach(embed => {
                mediaItems.push({
                    type: 'embed',
                    position: embed.position,
                    data: embed
                });
            });
        }

        // Sort all media items by position
        const sortedMediaItems = mediaItems.sort((a, b) => a.position - b.position);

        // Start with an offset of 0 - this will increase as we insert media items
        let offset = 0;

        for (const mediaItem of sortedMediaItems) {
            // Adjust position based on previous inserts
            const adjustedPosition = mediaItem.position + offset;

            // Find the nearest paragraph end to insert the media after
            // Look for double newlines which indicate paragraph boundaries
            let insertPosition = processedContent.indexOf('\n\n', adjustedPosition);
            if (insertPosition === -1) {
                // If no paragraph boundary is found, add to the end
                insertPosition = processedContent.length;
            } else {
                // Move past the newlines
                insertPosition += 2;
            }

            let mediaMarkdown = '';
            
            if (mediaItem.type === 'image') {
                const image = mediaItem.data as NotionImage;
                mediaMarkdown = `![${image.caption || 'Image'}](${image.url})${image.caption ? `\n*${image.caption}*` : ''}\n\n`;
            } else if (mediaItem.type === 'embed') {
                const embed = mediaItem.data as NotionEmbed;
                mediaMarkdown = `[embed:${embed.type}](${embed.url})\n\n`;
            }

            // Insert the media markdown at the determined position
            processedContent =
                processedContent.substring(0, insertPosition) +
                mediaMarkdown +
                processedContent.substring(insertPosition);

            // Update offset for future media inserts
            offset += mediaMarkdown.length;
        }

        return processedContent;
    };

    // Function to get language-specific CSS classes and apply simple syntax highlighting
    const getLanguageClass = (language: string) => {
        switch (language.toLowerCase()) {
            case 'solidity':
                return 'text-blue-300';
            case 'javascript':
            case 'js':
                return 'text-yellow-300';
            case 'typescript':
            case 'ts':
                return 'text-blue-400';
            case 'python':
                return 'text-green-300';
            case 'rust':
                return 'text-orange-300';
            case 'go':
                return 'text-cyan-300';
            default:
                return 'text-gray-100';
        }
    };

    // Function to tokenize and highlight code
    const tokenizeCode = (code: string, language: string) => {
        if (!language) return [{ type: 'text', content: code }];
        
        const tokens: Array<{ type: string; content: string }> = [];
        
        if (language.toLowerCase() === 'solidity') {
            // Use a more comprehensive regex to tokenize Solidity code
            const pattern = /(\b(?:contract|function|uint256|address|mapping|public|private|internal|external|view|pure|payable|modifier|event|struct|enum|require|assert|revert|returns|bool|if|else|for|while|uint|int|bytes|string|memory|storage|calldata|constructor|fallback|receive|emit|new|delete|this|super|msg|tx|block|abi|type|using|library|interface|abstract|virtual|override|immutable|constant)\b|"[^"]*"|\b(?:true|false|null)\b|\/\/.*$|\/\*[\s\S]*?\*\/|\b\d+\b|\b0x[a-fA-F0-9]+\b)/g;
            
            let lastIndex = 0;
            let match;
            
            while ((match = pattern.exec(code)) !== null) {
                // Add text before the match
                if (match.index > lastIndex) {
                    tokens.push({ type: 'text', content: code.substring(lastIndex, match.index) });
                }
                
                const matchedText = match[0];
                
                // Classify the token
                if (/\b(?:contract|function|uint256|address|mapping|public|private|internal|external|view|pure|payable|modifier|event|struct|enum|require|assert|revert|returns|bool|if|else|for|while|uint|int|bytes|string|memory|storage|calldata|constructor|fallback|receive|emit|new|delete|this|super|msg|tx|block|abi|type|using|library|interface|abstract|virtual|override|immutable|constant)\b/.test(matchedText)) {
                    tokens.push({ type: 'keyword', content: matchedText });
                } else if (/\b(?:true|false|null)\b/.test(matchedText)) {
                    tokens.push({ type: 'boolean', content: matchedText });
                } else if (/^"[^"]*"$/.test(matchedText)) {
                    tokens.push({ type: 'string', content: matchedText });
                } else if (/^\/\/.*$/.test(matchedText) || /^\/\*[\s\S]*?\*\/$/.test(matchedText)) {
                    tokens.push({ type: 'comment', content: matchedText });
                } else if (/^\b\d+\b$/.test(matchedText) || /^0x[a-fA-F0-9]+$/.test(matchedText)) {
                    tokens.push({ type: 'number', content: matchedText });
                } else {
                    tokens.push({ type: 'text', content: matchedText });
                }
                
                lastIndex = pattern.lastIndex;
            }
            
            // Add remaining text
            if (lastIndex < code.length) {
                tokens.push({ type: 'text', content: code.substring(lastIndex) });
            }
        } else {
            // For other languages, just return as text with basic language coloring
            tokens.push({ type: 'text', content: code });
        }
        
        return tokens;
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
        // Custom links with clear styling and embed handling
        a: ({ node, children, href }: any) => {
            // Check if this is an embed link
            if (typeof children === 'string' && children.startsWith('embed:')) {
                const embedType = children.replace('embed:', '');
                
                if (embedType === 'twitter' && href) {
                    return <TwitterEmbed url={href} />;
                }
                
                // Fallback for other embed types
                return (
                    <div className="my-6 p-4 border border-accent/30 rounded-lg bg-accent/5">
                        <p className="text-sm text-accent/80 mb-2">Embedded content:</p>
                        <a
                            href={href}
                            className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-light hover:decoration-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {href}
                        </a>
                    </div>
                );
            }
            
            // Regular link
            return (
                <a
                    href={href}
                    className="text-accent underline decoration-1 underline-offset-2 hover:text-accent-light hover:decoration-2 hover:bg-accent/10 px-1 py-0.5 rounded transition-all duration-200"
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                    {children}
                </a>
            );
        },
        // Regular content elements
        p: ({ node, children, ...props }: any) => (
            <p className="mb-4" {...props}>
                {children}
            </p>
        ),
        strong: ({ node, children, ...props }: any) => (
            <strong className="font-bold text-white bg-accent/20 px-1 py-0.5 rounded" {...props}>
                {children}
            </strong>
        ),
        em: ({ node, children, ...props }: any) => (
            <em className="italic text-accent-light" {...props}>
                {children}
            </em>
        ),
        del: ({ node, children, ...props }: any) => (
            <del className="line-through text-gray-500 opacity-80" {...props}>
                {children}
            </del>
        ),
        mark: ({ node, children, ...props }: any) => (
            <mark className="bg-yellow-300 text-gray-900 px-1 py-0.5 rounded" {...props}>
                {children}
            </mark>
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
        // Code blocks with syntax highlighting
        code: ({ inline, className, children, ...props }: any) => {
            const language = className ? className.replace('language-', '') : '';
            let codeContent = String(children).replace(/\n$/, '');
            
            // Determine if this is inline code based on className
            // If className is undefined/empty, it's inline code (single backticks)
            // If className exists (like 'language-solidity'), it's block code (triple backticks)
            const isInlineCode = !className;
            
            // Remove language info from the beginning of code content if it exists
            // This handles cases where the language name appears at the start of the code
            if (language && codeContent.startsWith(language)) {
                // Check if it's followed by newline or is the entire first line
                if (codeContent.startsWith(language + '\n')) {
                    codeContent = codeContent.substring(language.length + 1);
                } else if (codeContent === language || codeContent.startsWith(language + ' ')) {
                    // Handle cases where language is the entire content or followed by space
                    const lines = codeContent.split('\n');
                    if (lines[0].trim() === language) {
                        codeContent = lines.slice(1).join('\n');
                    }
                }
            }
            
            // Render inline code
            if (isInlineCode) {
                return (
                    <code className="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm font-mono border border-gray-600" {...props}>
                        {children}
                    </code>
                );
            } else {
                // This is a block code element
                const tokens = tokenizeCode(codeContent, language);
                
                return (
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700">
                        <code className={`text-sm font-mono ${getLanguageClass(language)}`} {...props}>
                            {tokens.map((token, index) => {
                                switch (token.type) {
                                    case 'keyword':
                                        return <span key={index} className="text-purple-400 font-semibold">{token.content}</span>;
                                    case 'boolean':
                                        return <span key={index} className="text-blue-300">{token.content}</span>;
                                    case 'string':
                                        return <span key={index} className="text-green-400">{token.content}</span>;
                                    case 'comment':
                                        return <span key={index} className="text-gray-500 italic">{token.content}</span>;
                                    case 'number':
                                        return <span key={index} className="text-yellow-300">{token.content}</span>;
                                    case 'newline':
                                        return <br key={index} />;
                                    default:
                                        return <span key={index}>{token.content}</span>;
                                }
                            })}
                        </code>
                    </pre>
                );
            }
        },
        // Blockquotes
        blockquote: ({ children }: any) => (
            <blockquote className="pl-4 border-l-4 border-accent/50 italic my-6">
                {children}
            </blockquote>
        )
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
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
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
import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const { searchParams } = new URL(request.url);
        const locale = searchParams.get('locale') || 'ja';

        if (!process.env.NOTION_API_KEY) {
            throw new Error('NOTION_API_KEY is not set');
        }

        const notion = new Client({ auth: process.env.NOTION_API_KEY });

        // Get the page from Notion
        const pageResponse = await notion.pages.retrieve({ page_id: id });

        // Get the page content blocks
        const blocksResponse = await notion.blocks.children.list({
            block_id: id,
            page_size: 100,
        });

        // Parse the Notion page properties
        // Casting to any as Notion's types don't fully match the API response structure
        const properties = (pageResponse as any).properties;
        const title = properties['Title']?.title?.[0]?.plain_text || 'Untitled';
        const category = properties['Category']?.select?.name || '';
        const publishedAt = properties['Published At']?.date?.start || '';
        const topic = properties['Topic']?.rich_text?.[0]?.plain_text || '';

        // Function to process rich text and extract links
        const processRichText = (richText: any[], startPosition: number, links: any[]) => {
            let text = '';
            let currentOffset = 0;

            richText.forEach(textItem => {
                text += textItem.plain_text;

                // If this text has a link, add it to the links array
                if (textItem.href) {
                    links.push({
                        text: textItem.plain_text,
                        url: textItem.href,
                        position: startPosition + currentOffset,
                        length: textItem.plain_text.length
                    });
                }

                currentOffset += textItem.plain_text.length;
            });

            return text;
        };

        // Parse the page content from blocks
        let content = '';
        let currentPosition = 0;
        const images: { url: string; caption?: string; position: number }[] = [];
        const links: { text: string; url: string; position: number; length: number }[] = [];

        for (const block of blocksResponse.results as BlockObjectResponse[]) {
            if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
                const paragraphText = processRichText(block.paragraph.rich_text, currentPosition, links);
                content += paragraphText + '\n\n';
                currentPosition += paragraphText.length + 2; // +2 for '\n\n'
            }
            else if (block.type === 'heading_1' && block.heading_1.rich_text.length > 0) {
                const headingText = processRichText(block.heading_1.rich_text, currentPosition + 2, links); // +2 for '# '
                content += '# ' + headingText + '\n\n';
                currentPosition += headingText.length + 4; // +4 for '# ' and '\n\n'
            }
            else if (block.type === 'heading_2' && block.heading_2.rich_text.length > 0) {
                const headingText = processRichText(block.heading_2.rich_text, currentPosition + 3, links); // +3 for '## '
                content += '## ' + headingText + '\n\n';
                currentPosition += headingText.length + 5; // +5 for '## ' and '\n\n'
            }
            else if (block.type === 'heading_3' && block.heading_3.rich_text.length > 0) {
                const headingText = processRichText(block.heading_3.rich_text, currentPosition + 4, links); // +4 for '### '
                content += '### ' + headingText + '\n\n';
                currentPosition += headingText.length + 6; // +6 for '### ' and '\n\n'
            }
            else if (block.type === 'bulleted_list_item' && block.bulleted_list_item.rich_text.length > 0) {
                const itemText = processRichText(block.bulleted_list_item.rich_text, currentPosition + 2, links); // +2 for '- '
                content += '- ' + itemText + '\n';
                currentPosition += itemText.length + 3; // +3 for '- ' and '\n'
            }
            else if (block.type === 'numbered_list_item' && block.numbered_list_item.rich_text.length > 0) {
                const itemText = processRichText(block.numbered_list_item.rich_text, currentPosition + 3, links); // +3 for '1. '
                content += '1. ' + itemText + '\n';
                currentPosition += itemText.length + 4; // +4 for '1. ' and '\n'
            }
            else if (block.type === 'image') {
                let imageUrl = '';
                let caption = '';

                if (block.image.type === 'external') {
                    imageUrl = block.image.external.url;
                } else if (block.image.type === 'file') {
                    imageUrl = block.image.file.url;
                }

                if (block.image.caption && block.image.caption.length > 0) {
                    caption = block.image.caption.map((c: any) => c.plain_text).join('');
                }

                if (imageUrl) {
                    images.push({
                        url: imageUrl,
                        caption: caption || undefined,
                        position: currentPosition
                    });
                }
            }
        }

        const news = {
            id,
            title,
            category,
            date: publishedAt,
            topic,
            content,
            images: images.length > 0 ? images : undefined,
            links: links.length > 0 ? links : undefined,
        };

        return NextResponse.json({ news });
    } catch (error) {
        console.error('Error fetching news by ID from Notion:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

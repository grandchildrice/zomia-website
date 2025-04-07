import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

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

        // Parse the page content from blocks
        let content = '';
        blocksResponse.results.forEach((block: any) => {
            if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
                content += block.paragraph.rich_text.map((text: any) => text.plain_text).join('') + '\n\n';
            } else if (block.type === 'heading_1' && block.heading_1.rich_text.length > 0) {
                content += '# ' + block.heading_1.rich_text.map((text: any) => text.plain_text).join('') + '\n\n';
            } else if (block.type === 'heading_2' && block.heading_2.rich_text.length > 0) {
                content += '## ' + block.heading_2.rich_text.map((text: any) => text.plain_text).join('') + '\n\n';
            } else if (block.type === 'heading_3' && block.heading_3.rich_text.length > 0) {
                content += '### ' + block.heading_3.rich_text.map((text: any) => text.plain_text).join('') + '\n\n';
            } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item.rich_text.length > 0) {
                content += '- ' + block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('') + '\n';
            } else if (block.type === 'numbered_list_item' && block.numbered_list_item.rich_text.length > 0) {
                content += '1. ' + block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('') + '\n';
            }
        });

        const news = {
            id,
            title,
            category,
            date: publishedAt,
            topic,
            content,
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

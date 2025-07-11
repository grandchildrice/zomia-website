import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const locale = searchParams.get('locale') || 'ja';

        if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
            throw new Error('Notion configuration is missing');
        }

        const notion = new Client({ auth: process.env.NOTION_API_KEY });
        const databaseId = process.env.NOTION_DATABASE_ID;

        // Query the Notion database
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                and: [
                    {
                        property: 'Published At',
                        date: {
                            is_not_empty: true,
                        },
                    },
                    {
                        property: 'Published',
                        checkbox: {
                            equals: true,
                        },
                    },
                ],
            },
            sorts: [
                {
                    property: 'Published At',
                    direction: 'descending',
                },
            ],
        });

        // Transform the Notion response to our desired format
        const news = response.results.map((page: any) => {
            const properties = page.properties;

            // Extract properties based on column names
            const title = properties['Title']?.title?.[0]?.plain_text || 'Untitled';
            const category = properties['Category']?.select?.name || '';
            const publishedAt = properties['Published At']?.date?.start || '';
            const topic = properties['Topic']?.rich_text?.[0]?.plain_text || '';

            return {
                id: page.id,
                title: title,
                category: category,
                date: publishedAt,
                topic: topic,
                excerpt: topic.substring(0, 150) + (topic.length > 150 ? '...' : ''),
            };
        });

        return NextResponse.json({ news });
    } catch (error) {
        console.error('Error fetching news from Notion:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

import { Client } from '@notionhq/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { formData, locale } = await request.json();

        if (!process.env.NOTION_API_KEY) {
            throw new Error('NOTION_API_KEY is not set');
        }

        const notion = new Client({ auth: process.env.NOTION_API_KEY });

        // Here we would need a Contact database ID to submit to
        // For this example, we'll assume there's a contact form database
        // You may need to create one or use a different database ID
        const contactDatabaseId = process.env.NOTION_CONTACT_DATABASE_ID || process.env.NOTION_DATABASE_ID;

        if (!contactDatabaseId) {
            throw new Error('Contact database ID is not configured');
        }

        // Create a new page in the contact database
        const response = await notion.pages.create({
            parent: {
                database_id: contactDatabaseId,
            },
            properties: {
                // Adapt these properties to match your Notion database schema
                'Name': {
                    title: [
                        {
                            text: {
                                content: formData.name || 'Anonymous',
                            },
                        },
                    ],
                },
                'Email': {
                    email: formData.email || '',
                },
                'Message': {
                    rich_text: [
                        {
                            text: {
                                content: formData.message || '',
                            },
                        },
                    ],
                },
                'Locale': {
                    rich_text: [
                        {
                            text: {
                                content: locale || 'ja',
                            },
                        },
                    ],
                },
                'Timestamp': {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
            },
        });

        return NextResponse.json({ success: true, id: response.id });
    } catch (error) {
        console.error('Error submitting contact form to Notion:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

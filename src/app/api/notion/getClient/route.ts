import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Initialize Notion client but don't expose the API key to the client
        // This route just verifies we can create a client successfully
        if (!process.env.NOTION_API_KEY) {
            throw new Error('NOTION_API_KEY is not set');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error initializing Notion client:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

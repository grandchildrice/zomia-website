import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono, Orbitron } from 'next/font/google';
import { NotionAPIProvider } from '@/lib/notionAPI';
import { LocaleProvider } from '@/lib/localeContext';
import { Locale, Params } from '@/types';
import { i18n } from '@/lib/i18n-utils';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
});

const orbitron = Orbitron({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-orbitron',
});

// サイトURLを環境変数から取得
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
    title: 'ZOMIA',
    description: 'Post-modern Cryptography Research Institute',
    icons: {
        icon: '/images/favicon.ico',
    },
    openGraph: {
        title: 'ZOMIA',
        description: 'Post-modern Cryptography Research Institute',
        url: WEBSITE_URL,
        siteName: 'ZOMIA',
        images: [
            {
                url: `${WEBSITE_URL}/images/ogp.jpg`,
                width: 1200,
                height: 630,
                alt: 'ZOMIA Logo',
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
};

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: Params;
}) {
    return (
        <html lang={lang} className={`${inter.variable} ${robotoMono.variable} ${orbitron.variable}`}>
            <head />
            <body>
                <NotionAPIProvider>
                    <LocaleProvider initialLocale={lang as Locale}>
                        {children}
                    </LocaleProvider>
                </NotionAPIProvider>
            </body>
        </html>
    );
}

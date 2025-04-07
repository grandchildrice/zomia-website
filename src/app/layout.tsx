import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono, Orbitron } from 'next/font/google';
import { NotionAPIProvider } from '@/lib/notionAPI';
import { LocaleProvider } from '@/lib/localeContext';
import { headers } from 'next/headers';
import { Locale } from '@/types';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ヘッダーからロケール情報を取得
  const headersList = headers();
  const localeFromHeader = headersList.get('x-locale') as Locale | null;
  const locale = localeFromHeader || 'ja';
  const lang = locale === 'ja' ? 'ja' : 'en';

  return (
    <html lang={lang} className={`${inter.variable} ${robotoMono.variable} ${orbitron.variable}`}>
      <head />
      <body>
        <NotionAPIProvider>
          <LocaleProvider initialLocale={locale}>
            {children}
          </LocaleProvider>
        </NotionAPIProvider>
      </body>
    </html>
  );
}

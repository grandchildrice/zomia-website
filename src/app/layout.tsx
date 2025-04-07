import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono, Orbitron } from 'next/font/google';
import { NotionAPIProvider } from '@/lib/notionAPI';

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

export const metadata: Metadata = {
  title: 'ZOMIA - 近未来暗号研究所',
  description: '十分に発達した暗号技術は、魔法と見分けがつかない',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${robotoMono.variable} ${orbitron.variable}`}>
      <body>
        <NotionAPIProvider>
          {children}
        </NotionAPIProvider>
      </body>
    </html>
  );
}

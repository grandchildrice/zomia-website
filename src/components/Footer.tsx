'use client';

import Link from 'next/link';
import { sitemap } from '../lib/sitemap';
import { Locale } from '../types';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale = 'ja' }: FooterProps) {
  const currentSitemap = sitemap[locale];
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-dark border-t border-accent/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ロゴと説明 */}
          <div className="space-y-4">
            <div className="font-display text-2xl tracking-wider text-accent">ZOMIA</div>
            <p className="text-sm opacity-70 max-w-xs">
              {locale === 'ja' 
                ? '十分に発達した暗号技術は、魔法と見分けがつかない'
                : 'Any sufficiently advanced cryptography is indistinguishable from magic'}
            </p>
            <div className="cryptic-text mt-6">
              {locale === 'ja' 
                ? '近未来暗号研究所'
                : 'Post-modern Cryptography Institute'}
            </div>
          </div>
          
          {/* リンク */}
          <div>
            <h3 className="text-lg font-display mb-4 text-accent-light">
              {locale === 'ja' ? 'リンク' : 'Links'}
            </h3>
            <ul className="space-y-2">
              {Object.entries(currentSitemap).map(([key, value]) => (
                <li key={key}>
                  <Link 
                    href={value.path}
                    className="text-sm hover:text-accent transition-colors duration-200"
                  >
                    {value.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* コンタクト */}
          <div>
            <h3 className="text-lg font-display mb-4 text-accent-light">
              {locale === 'ja' ? 'コンタクト' : 'Contact'}
            </h3>
            <div className="space-y-2 text-sm">
              <p className="retro-terminal text-xs p-2">
                <span className="text-retro">$</span> ./contact.sh<br/>
                <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'お問い合わせはContactページからお願いします' : 'Please use the Contact page for inquiries'}
              </p>
            </div>
          </div>
        </div>
        
        {/* コピーライト */}
        <div className="mt-12 pt-6 border-t border-accent/10 text-center text-xs opacity-50">
          <p>© {currentYear} ZOMIA - {locale === 'ja' ? '近未来暗号研究所' : 'Post-modern Cryptography Institute'}</p>
          <p className="mt-1 font-mono text-[10px] tracking-widest">
            {locale === 'ja' 
              ? '暗号戦争IIに備えよ'
              : 'PREPARE FOR CRYPTO WARS II'}
          </p>
        </div>
      </div>
    </footer>
  );
}

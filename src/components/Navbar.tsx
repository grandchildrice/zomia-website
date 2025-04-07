'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types';

interface NavbarProps {
  locale: Locale;
}

const Navbar = ({ locale }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 言語切替
  const toggleLocale = () => {
    const newLocale = locale === 'ja' ? 'en' : 'ja';

    // Get the path without the locale prefix
    let path = pathname || '/';
    const segments = path.split('/');

    // If the current path has a valid locale as the first segment, remove it
    if (segments.length > 1 && ['ja', 'en'].includes(segments[1])) {
      segments.splice(1, 1);
      path = segments.join('/') || '/';
    }

    // Create the new path with the new locale
    const newPath = `/${newLocale}${path}`;
    router.push(newPath);
  };

  // ナビゲーションリンク
  const navLinks = [
    { href: '/', label: locale === 'ja' ? 'ホーム' : 'Home' },
    { href: '/about', label: locale === 'ja' ? '私たちについて' : 'About' },
    { href: '/news', label: locale === 'ja' ? 'ニュース' : 'News' },
    { href: '/research', label: locale === 'ja' ? '研究' : 'Research' },
    { href: '/business', label: locale === 'ja' ? 'ビジネス' : 'Business' },
    { href: '/community', label: locale === 'ja' ? 'コミュニティ' : 'Community' },
    { href: '/contact', label: locale === 'ja' ? 'お問い合わせ' : 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-dark/90 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* ロゴ */}
          <Link href={`/${locale}`} className="flex items-center">
            <div className="relative w-10 h-10 mr-2 glow-effect">
              <Image
                src="/images/zomia_logo.svg"
                alt="ZOMIA"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-display tracking-wider magic-text">ZOMIA</span>
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className={`nav-link ${pathname?.endsWith(link.href) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {/* 言語切替ボタン */}
            <button
              onClick={toggleLocale}
              className="retro-button px-3 py-1 text-sm"
              aria-label={locale === 'ja' ? 'Switch to English' : '日本語に切り替え'}
            >
              {locale === 'ja' ? 'EN' : 'JP'}
            </button>
          </div>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden retro-button p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </button>
        </div>

        {/* モバイルメニュー */}
        <div className={`md:hidden retro-terminal mt-4 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="p-4 space-y-4">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={`/${locale}${link.href === '/' ? '' : link.href}`}
                  className={`block py-2 ${pathname?.endsWith(link.href) ? 'text-accent' : 'hover:text-accent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-retro">$</span> {link.label}
                </Link>
              </div>
            ))}

            <div className="pt-4 border-t border-accent/30">
              <button
                onClick={toggleLocale}
                className="w-full text-left py-2"
              >
                <span className="text-retro">$</span> {locale === 'ja' ? 'Switch to English' : '日本語に切り替え'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

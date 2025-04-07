'use client';

import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import { useLocale } from '@/lib/localeContext';
import News from '@/components/News';
import Link from 'next/link';
import Image from 'next/image';
import ResearchSVG from '@/components/ResearchSVG';
import BusinessSVG from '@/components/BusinessSVG';
import CommunitySVG from '@/components/CommunitySVG';

interface HomePageProps {
  params: {
    locale?: string;
  };
}

export default function EnPage({ params }: HomePageProps) {
  const { locale } = useLocale();

  // 星空背景のアニメーション効果
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;

      starsContainer.innerHTML = '';
      const count = Math.floor(window.innerWidth / 4);

      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);

    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  // 翻訳テキスト
  const t = {
    hero: {
      title: 'Post-modern Cryptography Institute "ZOMIA"',
      subtitle: 'Any sufficiently advanced cryptography is indistinguishable from magic',
      cta: 'Learn More'
    },
    intro: {
      title: 'About ZOMIA',
      description: 'ZOMIA is advancing research and development in next-generation cryptographic technologies, which we position as "Post-modern Cryptography," including quantum-resistant cryptography for the quantum computing era, the fusion of biometric authentication and cryptography, secure computation technologies, and verifiable computation including zero-knowledge proofs.'
    },
    research: {
      title: 'Research Themes',
      description: 'Research on Post-modern Cryptography',
      areas: [
        {
          title: 'Biometric Cryptography',
          description: 'Utilizing human-specific information such as fingerprints and brain signatures as keys to clearly distinguish between AI and humans'
        },
        {
          title: 'Post-Quantum Cryptography',
          description: 'New-generation security based on the premise of quantum computer development to replace existing cryptographic methods such as RSA and elliptic curve cryptography'
        },
        {
          title: 'Secure Computation',
          description: 'Performing calculations while maintaining confidential data of individuals and companies, completely protecting privacy even under large-scale surveillance by drones, satellites, and AI'
        },
        {
          title: 'Verifiable Computation',
          description: 'Safely collaborating with untrusted third parties by proving validity without revealing data content using methods such as zero-knowledge proofs'
        }
      ]
    },
    activities: {
      title: 'Activities',
      items: [
        {
          title: 'Research',
          description: 'Collaborate on research on cryptography through grants from PSEs, blockchain companies, etc.'
        },
        {
          title: 'Business',
          description: 'Red Team exercises and security diagnostics for companies using automated security agents.'
        },
        {
          title: 'Community',
          description: 'Management of Zero Knowledge Proofing Communities such as ZK Tokyo and Core Program.'
        }
      ]
    },
    news: {
      title: 'Latest News',
      viewAll: 'View All'
    },
    contact: {
      title: 'Contact Us',
      description: 'For inquiries about research collaboration, business, community activities, etc., please feel free to contact us.',
      button: 'Go to Contact Page'
    }
  };

  // モックニュースデータ
  const newsItems = [
    {
      id: '1',
      title: 'ZOMIA Establishes Post-modern Cryptography Institute',
      date: '2025-01-01',
      excerpt: 'Announced the establishment of the Post-modern Cryptography Institute "ZOMIA". We will advance research and development of new cryptographic technologies for the quantum computing era.'
    },
    {
      id: '2',
      title: 'Latest Research Results on Zero-Knowledge Proofs Announced',
      date: '2025-02-15',
      excerpt: 'Successfully developed an efficient zero-knowledge proof system. Compared to conventional methods, it can reduce computational costs by 50% while maintaining security levels.'
    }
  ];

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <PageLayout locale={locale}>
      {/* 星空背景 */}
      <div id="stars-container" className="fixed inset-0 z-[-1] overflow-hidden" />

      {/* スキャンライン効果 */}
      <div className="scanline"></div>

      {/* CRT効果のオーバーレイ */}
      <div className="crt-effect fixed inset-0 z-[100] pointer-events-none"></div>

      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden magic-bg-enhanced">
        <div className="absolute inset-0 z-[-1]">
          <div className="magic-circle"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Image
              src="/images/zomia_logo.svg"
              alt="ZOMIA"
              width={180}
              height={180}
              className="mx-auto float-element glow-effect"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-display mb-6 magic-text-enhanced glitch-text">
            {t.hero.title}
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-80 typewriter hologram">
            {t.hero.subtitle}
          </p>

          <Link
            href="/en/about"
            className="magic-button-enhanced text-lg"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* イントロセクション */}
      <section className="py-24 bg-primary-dark cyberpunk-grid">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-center mb-8 magic-text-enhanced text-3d">
              {t.intro.title}
            </h2>

            <p className="text-lg text-center leading-relaxed opacity-80 magic-card-enhanced p-6">
              {t.intro.description}
            </p>
          </div>
        </div>
      </section>

      {/* 研究テーマセクション */}
      <section className="py-24 magic-particles">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-4 magic-text-enhanced">
            {t.research.title}
          </h2>

          <p className="text-center max-w-3xl mx-auto mb-16 opacity-80">
            {t.research.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 glow-effect">
                <ResearchSVG />
              </div>
            </div>

            <div className="space-y-6">
              {t.research.areas.map((area, index) => (
                <div key={index} className="magic-card-enhanced hover:translate-x-1 transition-transform duration-300">
                  <h3 className="text-xl font-display mb-2 text-accent hologram">{area.title}</h3>
                  <p className="opacity-80">{area.description}</p>
                </div>
              ))}

              <div className="text-right">
                <Link
                  href="/en/research"
                  className="text-accent hover:underline magic-text"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 活動内容セクション */}
      <section className="py-24 bg-primary-light/50 constellation">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-16 magic-text-enhanced">
            {t.activities.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="magic-card-enhanced h-full">
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 glow-effect">
                  <ResearchSVG />
                </div>
              </div>
              <h3 className="text-2xl font-display text-center mb-4 text-accent hologram">
                {t.activities.items[0].title}
              </h3>
              <p className="opacity-80 text-center">
                {t.activities.items[0].description}
              </p>
            </div>

            <div className="magic-card-enhanced h-full">
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 glow-effect">
                  <BusinessSVG />
                </div>
              </div>
              <h3 className="text-2xl font-display text-center mb-4 text-accent hologram">
                {t.activities.items[1].title}
              </h3>
              <p className="opacity-80 text-center">
                {t.activities.items[1].description}
              </p>
            </div>

            <div className="magic-card-enhanced h-full">
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 glow-effect">
                  <CommunitySVG />
                </div>
              </div>
              <h3 className="text-2xl font-display text-center mb-4 text-accent hologram">
                {t.activities.items[2].title}
              </h3>
              <p className="opacity-80 text-center">
                {t.activities.items[2].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ニュースセクション */}
      <section className="py-24 cyberpunk-grid">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display text-center mb-16 magic-text-enhanced glitch-text">
            {t.news.title}
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={`/en/news/${item.id}`}
                className="block"
              >
                <div className="magic-card-enhanced hover:translate-x-1 transition-transform duration-300">
                  <div className="text-sm font-mono text-accent mb-2 cryptic-text">
                    {formatDate(item.date)}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display mb-3 hologram">
                    {item.title}
                  </h3>
                  <p className="opacity-80">
                    {item.excerpt}
                  </p>
                  <div className="mt-4 text-sm text-accent magic-text">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/en/news"
              className="magic-button-enhanced"
            >
              {t.news.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-24 bg-primary-dark magic-bg-enhanced">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6 magic-text-enhanced">
            {t.contact.title}
          </h2>

          <p className="max-w-2xl mx-auto mb-12 opacity-80 text-lg retro-terminal-enhanced p-6">
            {t.contact.description}
          </p>

          <Link
            href="/en/contact"
            className="magic-button-enhanced text-lg"
          >
            {t.contact.button}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

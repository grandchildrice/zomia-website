'use client';

import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Locale } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import ResearchSVG from '@/components/ResearchSVG';
import BusinessSVG from '@/components/BusinessSVG';
import CommunitySVG from '@/components/CommunitySVG';
import News from '@/components/News';

interface HomePageProps {
  params: {
    locale?: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const locale = "ja";

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
      title: '近未来暗号研究所「ZOMIA」',
      subtitle: '十分に発達した暗号技術は、魔法と見分けがつかない',
      cta: '詳細を見る'
    },
    intro: {
      title: 'ZOMIAについて',
      description: 'ZOMIAは、量子コンピュータ時代に向けた耐量子暗号、生体認証と暗号の融合、秘密計算技術、ゼロ知識証明を含む検証可能計算など、「近未来暗号（Post-modern Cryptography）」と位置づける次世代の暗号技術の研究開発を進めています。'
    },
    research: {
      title: '研究テーマ',
      description: '近未来暗号（Post-modern Cryptography）の研究',
      areas: [
        {
          title: '生体暗号/認証',
          description: '指紋や脳波など人間固有の情報を鍵として活用し、AIと人間を明確に区別する'
        },
        {
          title: '耐量子暗号',
          description: '量子コンピュータの開発を前提とした、RSAや楕円曲線暗号などの既存の暗号方式に代わる新世代のセキュリティ'
        },
        {
          title: '秘密計算技術',
          description: '個人や企業の機密データを保持したまま計算を行い、ドローンや衛星、AIによる大規模監視下でもプライバシーを完全に保護'
        },
        {
          title: '検証可能計算',
          description: 'ゼロ知識証明などを用いてデータの内容を明かさずに正当性を証明し、信頼できない第三者と安全に協力'
        }
      ]
    },
    activities: {
      title: '活動内容',
      items: [
        {
          title: 'Research',
          description: 'PSE、ブロックチェーン企業などからの助成金を通じて、暗号技術に関する研究を共同で行っています。'
        },
        {
          title: 'Business',
          description: '自動化されたセキュリティエージェントを使用した企業向けのレッドチーム演習とセキュリティ診断を提供しています。'
        },
        {
          title: 'Community',
          description: 'ZK TokyoやCore Programなどのゼロ知識証明コミュニティの運営を行っています。'
        }
      ]
    },
    news: {
      title: '最新ニュース',
      viewAll: '全て見る'
    },
    contact: {
      title: 'お問い合わせ',
      description: '研究協力、ビジネス、コミュニティ活動などに関するお問い合わせは、お気軽にご連絡ください。',
      button: 'お問い合わせページへ'
    }
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
            href="/about"
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
                  href="/research"
                  className="text-accent hover:underline magic-text"
                >
                  詳細を見る →
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

          <News
            locale={locale}
            limit={3}
            showHeader={false}
            className="mb-8"
          />

          <div className="text-center mt-12">
            <Link
              href="/news"
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
            href="/contact"
            className="magic-button-enhanced text-lg"
          >
            {t.contact.button}
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

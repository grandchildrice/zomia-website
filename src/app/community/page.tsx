'use client';

import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: {
    locale?: string;
  };
}

export default function CommunityPage({ params }: PageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const title = locale === 'ja' ? 'コミュニティ' : 'Community';
  const subtitle = locale === 'ja'
    ? 'ゼロ知識証明コミュニティの運営'
    : 'Management of Zero Knowledge Proofing Communities';

  // コミュニティ情報
  const communities = [
    {
      id: 'zktokyo',
      title: 'ZK Tokyo',
      description: locale === 'ja'
        ? 'ゼロ知識証明技術に特化した東京ベースのコミュニティです。定期的なミートアップ、ワークショップ、ハッカソンを開催し、ゼロ知識証明技術の普及と発展に貢献しています。初心者から専門家まで、様々なレベルの参加者が交流できる場を提供しています。'
        : 'A Tokyo-based community specializing in zero-knowledge proof technology. We host regular meetups, workshops, and hackathons, contributing to the popularization and development of zero-knowledge proof technology. We provide a space for participants of various levels, from beginners to experts, to interact.'
    },
    {
      id: 'coreprogram',
      title: 'Core Program',
      description: locale === 'ja'
        ? '暗号技術の次世代研究者を育成するための教育プログラムです。大学生や若手エンジニアを対象に、暗号理論の基礎から最新の応用まで、体系的に学ぶ機会を提供しています。実践的なプロジェクトを通じて、理論と実装の両面からスキルを磨くことができます。'
        : 'An educational program designed to nurture the next generation of cryptography researchers. Targeting university students and young engineers, we provide opportunities to systematically learn from the basics of cryptographic theory to the latest applications. Through practical projects, participants can hone their skills from both theoretical and implementation perspectives.'
    }
  ];

  // イベント情報
  const events = [
    {
      id: 'event1',
      title: locale === 'ja' ? 'ZK Tokyo ミートアップ Vol.10' : 'ZK Tokyo Meetup Vol.10',
      date: '2025-05-15',
      location: locale === 'ja' ? '東京都渋谷区' : 'Shibuya, Tokyo',
      description: locale === 'ja'
        ? 'ゼロ知識証明の最新研究動向と実装事例についてのディスカッション。ゲストスピーカーによる講演とQ&Aセッションを予定しています。'
        : 'Discussion on the latest research trends and implementation cases of zero-knowledge proofs. Guest speaker presentations and Q&A sessions are planned.'
    },
    {
      id: 'event2',
      title: locale === 'ja' ? 'Core Program 2025 夏期講習' : 'Core Program 2025 Summer Course',
      date: '2025-07-10 - 2025-07-31',
      location: locale === 'ja' ? 'オンライン' : 'Online',
      description: locale === 'ja'
        ? '3週間の集中講座で暗号理論と実装を学びます。最終週にはハッカソン形式のプロジェクト発表会を実施します。'
        : 'Learn cryptographic theory and implementation in a 3-week intensive course. A hackathon-style project presentation will be held in the final week.'
    },
    {
      id: 'event3',
      title: locale === 'ja' ? 'ZK Hackathon 2025' : 'ZK Hackathon 2025',
      date: '2025-09-20 - 2025-09-22',
      location: locale === 'ja' ? '東京都千代田区' : 'Chiyoda, Tokyo',
      description: locale === 'ja'
        ? 'ゼロ知識証明技術を活用した革新的なプロジェクトを48時間で開発するハッカソン。優勝チームには研究助成金を提供します。'
        : 'A hackathon to develop innovative projects utilizing zero-knowledge proof technology in 48 hours. Research grants will be provided to the winning team.'
    }
  ];

  // リソース情報
  const resources = [
    {
      id: 'resource1',
      title: locale === 'ja' ? 'ゼロ知識証明入門ガイド' : 'Introduction to Zero-Knowledge Proofs Guide',
      type: locale === 'ja' ? 'PDF文書' : 'PDF Document',
      description: locale === 'ja'
        ? 'ゼロ知識証明の基本概念から応用例まで、初心者向けに解説した入門ガイドです。'
        : 'An introductory guide for beginners explaining the basic concepts of zero-knowledge proofs to application examples.'
    },
    {
      id: 'resource2',
      title: locale === 'ja' ? 'ZK実装ワークショップ資料' : 'ZK Implementation Workshop Materials',
      type: locale === 'ja' ? 'GitHub リポジトリ' : 'GitHub Repository',
      description: locale === 'ja'
        ? 'ゼロ知識証明の実装方法を学ぶためのコードサンプルとチュートリアルを含むリポジトリです。'
        : 'A repository containing code samples and tutorials for learning how to implement zero-knowledge proofs.'
    },
    {
      id: 'resource3',
      title: locale === 'ja' ? '暗号理論講義シリーズ' : 'Cryptographic Theory Lecture Series',
      type: locale === 'ja' ? '動画コンテンツ' : 'Video Content',
      description: locale === 'ja'
        ? 'Core Programで使用している暗号理論の講義動画シリーズです。基礎から応用まで体系的に学べます。'
        : 'A series of lecture videos on cryptographic theory used in the Core Program. Learn systematically from basics to applications.'
    }
  ];

  return (
    <PageLayout locale={locale}>
      {/* ヒーローセクション */}
      <section className="pt-24 pb-16 bg-primary-dark">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display text-center mb-6 magic-text">
            {title}
          </h1>
          <p className="text-center max-w-3xl mx-auto opacity-80 text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      {/* コミュニティ紹介セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center mb-12 magic-text">
            {locale === 'ja' ? '運営コミュニティ' : 'Managed Communities'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communities.map((community) => (
              <div key={community.id} className="magic-card h-full">
                <h3 className="text-2xl font-display mb-4 text-accent">{community.title}</h3>
                <p className="opacity-80">{community.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* イベントセクション */}
      {/* <section className="py-16 bg-primary-light/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center mb-12 magic-text">
            {locale === 'ja' ? '今後のイベント' : 'Upcoming Events'}
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {events.map((event) => (
              <div key={event.id} className="magic-card hover:translate-x-1 transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <div className="text-accent font-mono">{event.date}</div>
                    <div className="text-sm opacity-70">{event.location}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                    <p className="opacity-80">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* リソースセクション */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center mb-12 magic-text">
            {locale === 'ja' ? 'コミュニティリソース' : 'Community Resources'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {resources.map((resource) => (
              <div key={resource.id} className="magic-card h-full">
                <h3 className="text-xl font-display mb-2 text-accent">{resource.title}</h3>
                <div className="text-xs font-mono text-secondary mb-3">{resource.type}</div>
                <p className="opacity-80 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#" className="magic-button">
              {locale === 'ja' ? 'すべてのリソースを見る' : 'View All Resources'}
            </a>
          </div>
        </div>
      </section> */}

      {/* 参加方法セクション */}
      {/* <section className="py-16 bg-primary-dark/70">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display mb-8 magic-text">
            {locale === 'ja' ? 'コミュニティに参加する' : 'Join Our Community'}
          </h2>

          <p className="max-w-2xl mx-auto mb-8 opacity-80">
            {locale === 'ja'
              ? 'ZK TokyoやCore Programに興味がある方は、お気軽にお問い合わせください。初心者向けの入門イベントから、専門家向けの研究会まで、様々な活動を行っています。'
              : 'If you are interested in ZK Tokyo or Core Program, please feel free to contact us. We conduct various activities, from introductory events for beginners to research meetings for experts.'}
          </p>

          <div className="retro-terminal max-w-md mx-auto p-6 text-left">
            <div className="text-sm">
              <span className="text-retro">$</span> ./join_community.sh<br />
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'コミュニティSlackに参加' : 'Join Community Slack'}<br />
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? '次回イベントに登録' : 'Register for next event'}<br />
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'ニュースレターを購読' : 'Subscribe to newsletter'}<br />
              <span className="text-retro">$</span> _
            </div>
          </div>

          <Link
            href={locale === 'ja' ? '/contact' : '/en/contact'}
            className="magic-button inline-block mt-8"
          >
            {locale === 'ja' ? 'お問い合わせページへ' : 'Go to Contact Page'}
          </Link>
        </div>
      </section> */}
    </PageLayout>
  );
}

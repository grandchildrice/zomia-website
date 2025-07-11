'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Locale } from '../types';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  topic?: string;
  content?: string;
  images?: NotionImage[];
  links?: NotionLink[];
  embeds?: NotionEmbed[];
}

export interface NotionImage {
  url: string;
  caption?: string;
  position: number;
}

export interface NotionLink {
  text: string;
  url: string;
  position: number;
  length: number;
}

export interface NotionEmbed {
  url: string;
  type: string;
  position: number;
}

type NotionAPIContextType = {
  fetchNews: (locale: Locale) => Promise<NewsItem[]>;
  fetchNewsById: (id: string, locale: Locale) => Promise<NewsItem | null>;
  submitContactForm: (formData: any, locale: Locale) => Promise<boolean>;
};

const NotionAPIContext = createContext<NotionAPIContextType | undefined>(undefined);

export const NotionAPIProvider = ({ children }: { children: ReactNode }) => {
  // Client-side cache for news data (only on client side)
  const [newsCache, setNewsCache] = useState<Map<string, { data: any; timestamp: number }>>(new Map());
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Check if we're on the client side
  const isClient = typeof window !== 'undefined';

  // Check if cached data is still valid
  const isValidCache = (cacheKey: string): boolean => {
    if (!isClient) return false;
    const cached = newsCache.get(cacheKey);
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  };

  // Get cached data if valid
  const getCachedData = (cacheKey: string): any => {
    if (!isClient) return null;
    const cached = newsCache.get(cacheKey);
    return cached ? cached.data : null;
  };

  // Set cache data
  const setCachedData = (cacheKey: string, data: any): void => {
    if (!isClient) return;
    setNewsCache(prev => new Map(prev).set(cacheKey, {
      data,
      timestamp: Date.now()
    }));
  };

  // NotionのAPIクライアントを初期化する関数
  const getNotionClient = async () => {
    try {
      const response = await fetch('/api/notion/getClient');
      if (!response.ok) {
        throw new Error('Failed to get Notion client');
      }
      return true;
    } catch (error) {
      console.error('Error getting Notion client:', error);
      return false;
    }
  };

  // ニュース記事を取得する関数
  const fetchNews = async (locale: Locale): Promise<NewsItem[]> => {
    const cacheKey = `news_${locale}`;
    
    // Check cache first
    if (isValidCache(cacheKey)) {
      return getCachedData(cacheKey);
    }

    try {
      // 実際のNotionのAPIを呼び出す
      const response = await fetch(`/api/notion/news?locale=${locale}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news from API');
      }
      const data = await response.json();
      
      // Cache the result
      setCachedData(cacheKey, data.news);
      
      return data.news;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      // エラー時はモックデータを返す
      return [
        {
          id: '1',
          title: locale === 'ja' ? 'ZOMIAが近未来暗号の研究所を設立' : 'ZOMIA Establishes Post-modern Cryptography Institute',
          date: '2025-01-01',
          category: locale === 'ja' ? '研究所' : 'Institute',
          topic: locale === 'ja' ? '量子コンピュータ時代に向けた新たな暗号技術の研究開発を進めていきます。' : 'Advancing research on new cryptographic technologies for the quantum computing era.',
          excerpt: locale === 'ja'
            ? '近未来暗号研究所「ZOMIA」の設立を発表しました。量子コンピュータ時代に向けた新たな暗号技術の研究開発を進めていきます。'
            : 'Announced the establishment of the Post-modern Cryptography Institute "ZOMIA". We will advance research and development of new cryptographic technologies for the quantum computing era.'
        },
        {
          id: '2',
          title: locale === 'ja' ? 'ゼロ知識証明の最新研究成果を発表' : 'Latest Research Results on Zero-Knowledge Proofs Announced',
          date: '2025-02-15',
          category: locale === 'ja' ? '研究' : 'Research',
          topic: locale === 'ja' ? 'ゼロ知識証明のスケーラビリティ向上' : 'Improving zero-knowledge proof scalability',
          excerpt: locale === 'ja'
            ? '効率的なゼロ知識証明システムの開発に成功しました。従来の方式と比較して計算コストを50%削減しつつ、セキュリティレベルを維持することができます。'
            : 'Successfully developed an efficient zero-knowledge proof system. Compared to conventional methods, it can reduce computational costs by 50% while maintaining security levels.'
        },
        {
          id: '3',
          title: locale === 'ja' ? 'ZK Tokyoコミュニティイベント開催のお知らせ' : 'Announcement of ZK Tokyo Community Event',
          date: '2025-03-10',
          category: locale === 'ja' ? 'イベント' : 'Event',
          topic: locale === 'ja' ? 'ゼロ知識証明の最新動向' : 'Latest trends in zero-knowledge proofs',
          excerpt: locale === 'ja'
            ? '2025年5月15日に東京でZK Tokyoミートアップ Vol.10を開催します。ゼロ知識証明の最新動向について議論する場を提供します。'
            : 'ZK Tokyo Meetup Vol.10 will be held in Tokyo on May 15, 2025. We will provide a forum to discuss the latest trends in zero-knowledge proofs.'
        }
      ];
    }
  };

  // 特定のニュース記事を取得する関数
  const fetchNewsById = async (id: string, locale: Locale): Promise<NewsItem | null> => {
    const cacheKey = `news_${id}_${locale}`;
    
    // Check cache first
    if (isValidCache(cacheKey)) {
      return getCachedData(cacheKey);
    }

    try {
      // 実際のNotionのAPIを呼び出す
      const response = await fetch(`/api/notion/news/${id}?locale=${locale}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news by ID from API');
      }
      const data = await response.json();
      
      // Cache the result
      setCachedData(cacheKey, data.news);
      
      return data.news;
    } catch (error) {
      console.error('Failed to fetch news by ID:', error);
      // エラー時はモックデータを返す
      const mockNewsDetails: Record<string, NewsItem> = {
        '1': {
          id: '1',
          title: locale === 'ja' ? 'ZOMIAが近未来暗号の研究所を設立' : 'ZOMIA Establishes Post-modern Cryptography Institute',
          date: '2025-01-01',
          category: locale === 'ja' ? '研究所' : 'Institute',
          topic: locale === 'ja' ? '量子コンピュータ時代に向けた新たな暗号技術の研究開発を進めていきます。' : 'Advancing research on new cryptographic technologies for the quantum computing era.',
          content: locale === 'ja'
            ? `
              近未来暗号研究所「ZOMIA」の設立を発表しました。

              この度、近未来暗号の研究に特化した研究所 **「ZOMIA」** を設立します。ZOMIAは、量子コンピュータの時代に向けた耐量子暗号、生体認証と暗号の融合、秘密計算技術、そしてゼロ知識証明を含む検証可能計算など、次世代の暗号技術を「近未来暗号（Post-modern Cryptography）」と位置づけ、研究開発を進めていきます。

              暗号輸出規制やスノーデン事件が教えてくれたのは、革新的な技術は登場とともに、それが悪用されるリスクにさらされるという点です。現在のAIブームの中でも同様の問題が再浮上しており、それを阻止する手段として、悪用自体を不可能にする暗号の力が再び注目される必要があります。

              まさに**暗号戦争II**へ突入しようとしているいま、サイファーパンクの精神を受け継ぎ、暗号技術の力で個人のプライバシーと自由を守るための研究と実践を行っていきます。

              主な研究分野：
              - \`post-quantum cryptography\` - 量子コンピュータに対する耐性
              - \`zero-knowledge proofs\` - プライバシー保護計算
              - \`homomorphic encryption\` - 暗号化データの計算

              例えば、\`AES-256\`のような従来の暗号化手法から、**格子暗号**や**多変数暗号**など、量子コンピュータに対して安全な暗号方式への移行が急務となっています。
            `
            : `
              We are pleased to announce the establishment of the Post-modern Cryptography Institute **"ZOMIA"**.

              ZOMIA will focus on research and development of next-generation cryptographic technologies, which we position as "Post-modern Cryptography," including quantum-resistant cryptography for the quantum computing era, the fusion of biometric authentication and cryptography, secure computation technologies, and verifiable computation including zero-knowledge proofs.

              What export regulations on cryptography and the Snowden incident have taught us is that innovative technologies are exposed to the risk of being misused as soon as they appear. Similar issues are re-emerging in the current AI boom, and the power of cryptography to make misuse itself impossible needs to be highlighted again as a means to prevent this.

              Now, as we are about to enter **Crypto Wars II**, we will inherit the cypherpunk spirit and conduct research and practice to protect individual privacy and freedom through the power of cryptographic technology.

              Main research areas:
              - \`post-quantum cryptography\` - Resistance to quantum computers
              - \`zero-knowledge proofs\` - Privacy-preserving computation
              - \`homomorphic encryption\` - Computation on encrypted data

              For example, we need to urgently transition from traditional encryption methods like \`AES-256\` to quantum-safe cryptographic schemes such as **lattice-based cryptography** and **multivariate cryptography**.
            `
        },
        '2': {
          id: '2',
          title: locale === 'ja' ? 'ゼロ知識証明の最新研究成果を発表' : 'Latest Research Results on Zero-Knowledge Proofs Announced',
          date: '2025-02-15',
          category: locale === 'ja' ? '研究' : 'Research',
          topic: locale === 'ja' ? 'ゼロ知識証明のスケーラビリティ向上' : 'Improving zero-knowledge proof scalability',
          content: locale === 'ja'
            ? `
              効率的なゼロ知識証明システムの開発に成功しました。

              ZOMIAの研究チームは、従来のゼロ知識証明システムと比較して計算コストを50%削減しつつ、セキュリティレベルを維持する新しいアルゴリズムを開発しました。この成果により、ブロックチェーンのスケーラビリティ向上やプライバシー保護アプリケーションの実用化が加速することが期待されます。

              開発したアルゴリズムは、特に以下の点で優れています：

              - 証明生成時間の大幅な短縮
              - 検証に必要な計算リソースの削減
              - 量子コンピュータに対する耐性の向上

              研究成果の詳細は学術論文として発表予定であり、オープンソースとして実装も公開する予定です。
            `
            : `
              We have successfully developed an efficient zero-knowledge proof system.

              ZOMIA's research team has developed a new algorithm that reduces computational costs by 50% compared to conventional zero-knowledge proof systems while maintaining security levels. This achievement is expected to accelerate the improvement of blockchain scalability and the practical application of privacy-protecting applications.

              The developed algorithm excels particularly in the following aspects:

              - Significant reduction in proof generation time
              - Reduction of computational resources required for verification
              - Improved resistance to quantum computers

              The details of the research results will be published as an academic paper, and the implementation will also be released as open source.
            `
        },
        '3': {
          id: '3',
          title: locale === 'ja' ? 'ZK Tokyoコミュニティイベント開催のお知らせ' : 'Announcement of ZK Tokyo Community Event',
          date: '2025-03-10',
          category: locale === 'ja' ? 'イベント' : 'Event',
          topic: locale === 'ja' ? 'ゼロ知識証明の最新動向' : 'Latest trends in zero-knowledge proofs',
          content: locale === 'ja'
            ? `
              2025年5月15日に東京でZK Tokyoミートアップ Vol.10を開催します。

              ZK Tokyoは、ゼロ知識証明技術に特化した東京ベースのコミュニティです。今回のミートアップでは、ゼロ知識証明の最新研究動向と実装事例についてのディスカッションを行います。

              イベント詳細：

              - 日時：2025年5月15日 19:00-21:00
              - 場所：東京都渋谷区（詳細は参加者に通知）
              - 内容：ゲストスピーカーによる講演、Q&Aセッション、ネットワーキング

              参加をご希望の方は、ZK Tokyoのウェブサイトからお申し込みください。参加費は無料です。
            `
            : `
              ZK Tokyo Meetup Vol.10 will be held in Tokyo on May 15, 2025.

              ZK Tokyo is a Tokyo-based community specializing in zero-knowledge proof technology. In this meetup, we will discuss the latest research trends and implementation cases of zero-knowledge proofs.

              Event details:

              - Date and time: May 15, 2025, 19:00-21:00
              - Location: Shibuya, Tokyo (details will be notified to participants)
              - Content: Guest speaker presentations, Q&A session, networking

              If you wish to participate, please apply from the ZK Tokyo website. Participation is free.
            `
        }
      };

      return mockNewsDetails[id] || null;
    }
  };

  // お問い合わせフォームを送信する関数
  const submitContactForm = async (formData: any, locale: Locale): Promise<boolean> => {
    try {
      // 実際のNotionのAPIを呼び出す
      const response = await fetch('/api/notion/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, locale }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      return false;
    }
  };

  const value = {
    fetchNews,
    fetchNewsById,
    submitContactForm,
  };

  return (
    <NotionAPIContext.Provider value={value}>
      {children}
    </NotionAPIContext.Provider>
  );
};

export const useNotionAPI = () => {
  const context = useContext(NotionAPIContext);
  if (context === undefined) {
    throw new Error('useNotionAPI must be used within a NotionAPIProvider');
  }
  return context;
};

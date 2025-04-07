'use client';

import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import Image from 'next/image';

interface PageProps {
  params: {
    locale?: string;
  };
}

export default function BusinessPage({ params }: PageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const title = locale === 'ja' ? 'ビジネス' : 'Business';
  const subtitle = locale === 'ja' 
    ? '自動化されたセキュリティエージェントを活用したサービス' 
    : 'Services utilizing automated security agents';
  
  // ビジネスサービス
  const services = [
    {
      id: 'redteam',
      title: locale === 'ja' ? 'レッドチーム演習' : 'Red Team Exercises',
      description: locale === 'ja'
        ? `
          当社の専門家チームと自動化されたAIセキュリティエージェントが、お客様のシステムに対して実際の攻撃者と同様のアプローチで
          セキュリティ評価を行います。これにより、理論上だけでなく実践的な脆弱性を発見し、対策を提案します。
          
          特に暗号実装の脆弱性、サイドチャネル攻撃の可能性、量子コンピュータによる将来的な脅威など、
          高度な暗号技術に関する評価に強みを持っています。
        `
        : `
          Our team of experts and automated AI security agents conduct security assessments of your systems using the same approach as actual attackers. This allows us to discover practical vulnerabilities, not just theoretical ones, and propose countermeasures.
          
          We have particular strengths in evaluating advanced cryptographic technologies, including cryptographic implementation vulnerabilities, side-channel attack possibilities, and future threats from quantum computers.
        `
    },
    {
      id: 'security',
      title: locale === 'ja' ? 'セキュリティ診断' : 'Security Diagnostics',
      description: locale === 'ja'
        ? `
          お客様のシステムやアプリケーションの暗号実装を詳細に分析し、業界標準やベストプラクティスに
          準拠しているかを評価します。また、将来的な脅威（量子コンピュータなど）に対する耐性も評価します。
          
          診断結果に基づいて、具体的な改善策や実装方法を提案し、必要に応じて実装のサポートも行います。
          特に、ゼロ知識証明や秘密計算などの最新の暗号技術の導入についてのコンサルティングも提供しています。
        `
        : `
          We analyze your system and application cryptographic implementations in detail and evaluate their compliance with industry standards and best practices. We also assess resistance to future threats (such as quantum computers).
          
          Based on diagnostic results, we propose specific improvement measures and implementation methods, and provide implementation support as needed. We also offer consulting on the introduction of the latest cryptographic technologies, such as zero-knowledge proofs and secure computation.
        `
    },
    {
      id: 'custom',
      title: locale === 'ja' ? 'カスタム暗号ソリューション' : 'Custom Cryptographic Solutions',
      description: locale === 'ja'
        ? `
          お客様の特定のニーズに合わせた暗号ソリューションの設計と実装を行います。
          プライバシー保護、データセキュリティ、認証システムなど、様々な用途に対応します。
          
          特に以下の分野での実績があります：
          • ゼロ知識証明を用いたプライバシー保護認証システム
          • 秘密計算技術を活用した複数組織間のデータ共有ソリューション
          • 耐量子暗号を用いた長期的なデータ保護システム
          • 生体認証と暗号技術を組み合わせたなりすまし防止システム
        `
        : `
          We design and implement cryptographic solutions tailored to your specific needs.
          We address various applications including privacy protection, data security, and authentication systems.
          
          We have particular expertise in the following areas:
          • Privacy-preserving authentication systems using zero-knowledge proofs
          • Data sharing solutions between multiple organizations utilizing secure computation technologies
          • Long-term data protection systems using quantum-resistant cryptography
          • Anti-impersonation systems combining biometric authentication and cryptographic technology
        `
    }
  ];
  
  // 導入事例（架空）
  const caseStudies = [
    {
      id: 'case1',
      title: locale === 'ja' ? '大手金融機関向け耐量子暗号導入' : 'Quantum-Resistant Cryptography Implementation for Major Financial Institution',
      description: locale === 'ja'
        ? '長期保存が必要な機密データを保護するため、耐量子暗号を段階的に導入。現行システムとの互換性を保ちながら、将来的な量子コンピュータの脅威に備えたセキュリティ体制を構築しました。'
        : 'Gradually implemented quantum-resistant cryptography to protect confidential data requiring long-term storage. Built a security system prepared for future quantum computer threats while maintaining compatibility with current systems.'
    },
    {
      id: 'case2',
      title: locale === 'ja' ? 'ブロックチェーン企業向けゼロ知識証明の実装' : 'Zero-Knowledge Proof Implementation for Blockchain Company',
      description: locale === 'ja'
        ? 'プライバシー保護と検証可能性を両立させるため、効率的なゼロ知識証明システムを設計・実装。トランザクションの詳細を明かさずに正当性を証明することで、ユーザープライバシーを保護しながらもブロックチェーンの透明性を維持することに成功しました。'
        : 'Designed and implemented an efficient zero-knowledge proof system to achieve both privacy protection and verifiability. Successfully maintained blockchain transparency while protecting user privacy by proving transaction validity without revealing details.'
    },
    {
      id: 'case3',
      title: locale === 'ja' ? '医療研究機関向け秘密計算プラットフォーム' : 'Secure Computation Platform for Medical Research Institution',
      description: locale === 'ja'
        ? '複数の医療機関が患者データを共有せずに共同研究を行うための秘密計算プラットフォームを開発。各機関のデータプライバシーを保護しながら、統計分析や機械学習モデルの構築を可能にしました。'
        : 'Developed a secure computation platform for multiple medical institutions to conduct joint research without sharing patient data. Enabled statistical analysis and machine learning model building while protecting each institution\'s data privacy.'
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
      
      {/* サービス紹介セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center mb-12 magic-text">
            {locale === 'ja' ? 'サービス' : 'Services'}
          </h2>
          
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={service.id} className={`magic-card ${index % 2 === 1 ? 'bg-primary-light/50' : ''}`}>
                <h3 className="text-2xl font-display mb-6 text-accent">{service.title}</h3>
                <div className="whitespace-pre-line">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 導入事例セクション */}
      <section className="py-16 bg-primary-dark/70">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display text-center mb-12 magic-text">
            {locale === 'ja' ? '導入事例' : 'Case Studies'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <div key={caseStudy.id} className="magic-card h-full">
                <h3 className="text-xl font-display mb-4 text-accent">{caseStudy.title}</h3>
                <p className="opacity-80">{caseStudy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* お問い合わせセクション */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display mb-6 magic-text">
            {locale === 'ja' ? 'お問い合わせ' : 'Contact Us'}
          </h2>
          
          <p className="max-w-2xl mx-auto mb-8 opacity-80">
            {locale === 'ja'
              ? 'サービスについてのご質問や、お見積りのご依頼は、お問い合わせフォームよりご連絡ください。'
              : 'For questions about our services or to request a quote, please contact us via the contact form.'}
          </p>
          
          <div className="retro-terminal max-w-md mx-auto p-6 text-left">
            <div className="text-sm">
              <span className="text-retro">$</span> ./contact_business.sh<br/>
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'セキュリティ診断のご依頼' : 'Request for security diagnostics'}<br/>
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'レッドチーム演習のご相談' : 'Consultation for red team exercises'}<br/>
              <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'カスタムソリューションの開発' : 'Development of custom solutions'}<br/>
              <span className="text-retro">$</span> _
            </div>
          </div>
          
          <a 
            href={locale === 'ja' ? '/contact' : '/en/contact'} 
            className="magic-button inline-block mt-8"
          >
            {locale === 'ja' ? 'お問い合わせページへ' : 'Go to Contact Page'}
          </a>
        </div>
      </section>
    </PageLayout>
  );
}

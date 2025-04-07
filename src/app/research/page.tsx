'use client';

import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import Image from 'next/image';

interface PageProps {
  params: {
    locale?: string;
  };
}

export default function ResearchPage({ params }: PageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const title = locale === 'ja' ? '研究' : 'Research';
  const subtitle = locale === 'ja' 
    ? '近未来暗号（Post-modern Cryptography）の研究' 
    : 'Research on Post-modern Cryptography';
  
  // 研究テーマ
  const researchAreas = [
    {
      id: 'biometric',
      title: locale === 'ja' ? '生体暗号/認証' : 'Biometric Cryptography',
      description: locale === 'ja'
        ? `
          AIと人間を明確に区別するため、指紋や脳内署名など人間固有の情報を鍵として活用し、なりすましやボット対策を強化します。
          
          生体情報は一度漏洩すると変更が困難であるという課題がありますが、私たちは生体情報そのものを保存せず、
          その特徴から安全に鍵を生成する手法を研究しています。また、AIによる生体情報の模倣を検出する技術も開発中です。
          
          主な研究テーマ:
          • 生体情報からの安全な鍵生成
          • 生体情報の漏洩に耐性のある認証システム
          • AIと人間を区別するための暗号学的手法
          • 脳波や心拍などの生理的特徴を用いた認証
        `
        : `
          To clearly distinguish between AI and humans, we utilize human-specific information such as fingerprints and brain signatures as keys, strengthening protection against impersonation and bots.
          
          While biometric information presents challenges as it cannot be easily changed once leaked, we research methods to generate keys safely from biometric features without storing the actual biometric data. We are also developing technologies to detect AI mimicry of biometric information.
          
          Main research themes:
          • Secure key generation from biometric information
          • Authentication systems resistant to biometric information leakage
          • Cryptographic methods to distinguish between AI and humans
          • Authentication using physiological features such as brain waves and heartbeats
        `
    },
    {
      id: 'quantum',
      title: locale === 'ja' ? '耐量子暗号' : 'Post-Quantum Cryptography',
      description: locale === 'ja'
        ? `
          量子コンピュータの発展を前提とした暗号方式で、既存のRSAや楕円曲線暗号などを代替する新世代の安全性を目指します。
          
          Googleの量子チップWillowなど、量子コンピュータの実用化が現実味を帯びる中、現代の暗号システムの多くが量子アルゴリズムによって
          破られる可能性があります。私たちは格子ベース、コードベース、多変数多項式ベース、ハッシュベースなど、
          量子コンピュータでも解読が困難とされる暗号方式の研究と実装を進めています。
          
          主な研究テーマ:
          • 格子ベース暗号の効率的な実装
          • 耐量子署名方式の開発
          • 量子鍵配送との併用による安全性強化
          • 既存システムへの耐量子暗号の段階的導入方法
        `
        : `
          Based on the premise of quantum computer development, we aim for new-generation security to replace existing cryptographic methods such as RSA and elliptic curve cryptography.
          
          As quantum computers become increasingly practical, as seen with Google's Willow quantum chip, many modern cryptographic systems may be vulnerable to quantum algorithms. We are advancing research and implementation of cryptographic methods considered difficult to decrypt even with quantum computers, including lattice-based, code-based, multivariate polynomial-based, and hash-based approaches.
          
          Main research themes:
          • Efficient implementation of lattice-based cryptography
          • Development of quantum-resistant signature schemes
          • Security enhancement through combined use with quantum key distribution
          • Gradual introduction methods of quantum-resistant cryptography into existing systems
        `
    },
    {
      id: 'mpc',
      title: locale === 'ja' ? '秘密計算技術' : 'Secure Computation',
      description: locale === 'ja'
        ? `
          ドローンや衛星、AIによる大規模監視下でも、個人や企業の機密データを保持したまま計算を行い、プライバシーを完全に保護します。
          
          秘密計算技術には、複数の当事者が互いにデータを明かさずに共同計算を行う多者間計算（MPC）、
          暗号化されたままデータを処理できる完全準同型暗号（FHE）、特定の機能のみを実行できる難読化技術（iO）などがあります。
          これらの技術により、データのプライバシーを保ちながら、AIの学習や分析、企業間の機密データ共有などが可能になります。
          
          主な研究テーマ:
          • 効率的な多者間計算プロトコルの開発
          • 完全準同型暗号の実用化に向けた高速化
          • プライバシー保護データマイニング
          • 秘密計算技術の産業応用（医療、金融、サプライチェーンなど）
        `
        : `
          Even under large-scale surveillance by drones, satellites, and AI, secure computation technologies allow calculations while maintaining confidential data of individuals and companies, completely protecting privacy.
          
          Secure computation technologies include multi-party computation (MPC) where multiple parties perform joint calculations without revealing data to each other, fully homomorphic encryption (FHE) that can process data while it remains encrypted, and obfuscation techniques (iO) that allow only specific functions to be executed. These technologies enable AI learning and analysis, confidential data sharing between companies, and more while maintaining data privacy.
          
          Main research themes:
          • Development of efficient multi-party computation protocols
          • Acceleration towards practical implementation of fully homomorphic encryption
          • Privacy-preserving data mining
          • Industrial applications of secure computation technologies (medical, financial, supply chain, etc.)
        `
    },
    {
      id: 'zk',
      title: locale === 'ja' ? '検証可能計算' : 'Verifiable Computation',
      description: locale === 'ja'
        ? `
          ゼロ知識証明などの手法を用い、データの内容を明かさずに正当性だけを証明することで、信頼できない第三者とも安全に計算を協調します。
          
          検証可能計算技術により、計算の正確さを証明しながらもプライバシーを保護することが可能になります。
          特にゼロ知識証明（ZKP）は、ブロックチェーンのスケーラビリティ向上やプライバシー保護、
          身元証明などの分野で革新的な応用が期待されています。
          
          主な研究テーマ:
          • zkSNARKs、zkSTARKsなどの効率的なゼロ知識証明システム
          • ゼロ知識仮想マシン（zkVM）の開発
          • ブロックチェーンにおけるプライバシー保護と検証可能性の両立
          • 分散型アイデンティティにおけるゼロ知識証明の応用
        `
        : `
          Using methods such as zero-knowledge proofs, we safely collaborate with untrusted third parties by proving validity without revealing data content.
          
          Verifiable computation technology makes it possible to protect privacy while proving computational accuracy. Zero-knowledge proofs (ZKP) in particular are expected to have innovative applications in areas such as improving blockchain scalability, privacy protection, and identity verification.
          
          Main research themes:
          • Efficient zero-knowledge proof systems such as zkSNARKs and zkSTARKs
          • Development of zero-knowledge virtual machines (zkVM)
          • Balancing privacy protection and verifiability in blockchains
          • Application of zero-knowledge proofs in decentralized identity
        `
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
      
      {/* 研究概要セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="magic-card mb-16">
            <h2 className="text-2xl font-display mb-6 text-accent">
              {locale === 'ja' ? '近未来暗号とは' : 'What is Post-modern Cryptography'}
            </h2>
            
            <div className="space-y-4">
              <p>
                {locale === 'ja'
                  ? '暗号の歴史を大きく振り返ると、「古典暗号」と「現代暗号」の二つに分けられます。'
                  : 'Looking back at the history of cryptography, it can be broadly divided into "classical cryptography" and "modern cryptography."'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {locale === 'ja'
                    ? '「古典暗号」は、シーザー暗号、スキュタレー暗号、第二次世界大戦期のドイツのEnigma、旧日本軍の九七式欧文印字機などに代表されるように、「アルゴリズム自体」を秘匿する方式です。'
                    : '"Classical cryptography," as represented by Caesar cipher, Scytale cipher, Germany\'s Enigma during World War II, and the former Japanese military\'s Type 97 printing machine, is a method of concealing the "algorithm itself."'}
                </li>
                <li>
                  {locale === 'ja'
                    ? '「現代暗号」は、AESやRSA暗号、楕円曲線暗号などのように、コンピュータ技術の発展によって確立された、「鍵」を秘密にし、暗号アルゴリズムを公開する方式です。現在のインターネットセキュリティのほとんどは、この現代暗号を基盤として成り立っています。'
                    : '"Modern cryptography," such as AES, RSA encryption, and elliptic curve cryptography, is a method established through the development of computer technology that keeps the "key" secret while making the encryption algorithm public. Most of today\'s internet security is based on this modern cryptography.'}
                </li>
              </ul>
              
              <p>
                {locale === 'ja'
                  ? 'しかし、現代暗号にはいくつかの課題が残されています。その最たる例は鍵管理の煩雑さです。'
                  : 'However, modern cryptography still has several challenges. The most prominent example is the complexity of key management.'}
              </p>
              
              <p>
                {locale === 'ja'
                  ? 'そこで提唱したいのが、「鍵の形だけでなく、計算そのものの在り方や人間の存在（生体情報）も統合して安全を実現する」という新たな概念としての「近未来暗号（Post-modern Cryptography）」です。'
                  : 'Therefore, we propose "Post-modern Cryptography" as a new concept that "realizes security by integrating not only the form of keys but also the nature of computation itself and human existence (biometric information)."'}
              </p>
              
              <p>
                {locale === 'ja'
                  ? '近未来暗号は、現代暗号の上位概念として、従来の「鍵を秘密にする」という枠組みをさらに押し広げ、人間自体が鍵として機能する仕組みや、プライバシー保護を前提とした計算アルゴリズムを組み込んでいきます。これにより、量子耐性や検証可能な計算手続きの実現を目指し、「鍵管理」という発想そのものを根本から変革する可能性を秘めています。'
                  : 'Post-modern Cryptography, as a higher concept of modern cryptography, further expands the framework of "keeping keys secret" to incorporate mechanisms where humans themselves function as keys and calculation algorithms premised on privacy protection. This aims to achieve quantum resistance and verifiable calculation procedures, with the potential to fundamentally transform the concept of "key management" itself.'}
              </p>
            </div>
          </div>
          
          {/* 研究テーマ詳細 */}
          <div className="space-y-16">
            {researchAreas.map((area, index) => (
              <div key={area.id} className={`magic-card ${index % 2 === 1 ? 'bg-primary-light/50' : ''}`}>
                <h2 className="text-2xl font-display mb-6 text-accent">
                  {area.title}
                </h2>
                
                <div className="whitespace-pre-line">
                  {area.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

'use client';

import PageLayout from '@/components/PageLayout';
import { Locale } from '../../types';
import Image from 'next/image';

interface PageProps {
  params: {
    locale?: string;
  };
}

export default function AboutPage({ params }: PageProps) {
  const locale = (params?.locale || 'ja') as Locale;
  const title = locale === 'ja' ? '私たちについて' : 'About Us';
  const subtitle = locale === 'ja' 
    ? '十分に発達した暗号技術は、魔法と見分けがつかない' 
    : 'Any sufficiently advanced cryptography is indistinguishable from magic';
  
  const aboutContent = locale === 'ja' 
    ? `
      近未来暗号研究所「ZOMIA」は、暗号技術の研究と応用に特化した組織です。
      
      私たちは、量子コンピュータの時代に向けた耐量子暗号、生体認証と暗号の融合、秘密計算技術、
      そしてゼロ知識証明を含む検証可能計算など、次世代の暗号技術を「近未来暗号（Post-modern Cryptography）」
      と位置づけ、研究開発を進めています。
      
      1995年まで続いていた暗号輸出に関する規制では、暗号文は武器と同義でした。
      政府が人々のデータにアクセスし、コントロールしようとする中、サイファーパンクの人々は
      政府推奨の暗号を短時間で解読し、バックドアを暴き出す草の根活動を展開しました。
      
      現在、AIの急速な発展、量子コンピュータの実用化、脳へのチップ埋め込み技術など、
      私たちの世界は想像を超えるスピードで進化しています。これらの技術革新は便利さをもたらす一方で、
      個人の自由や権利に対する新たな脅威となる可能性もあります。
      
      ZOMIAは、こうした「暗号戦争II」とも呼ぶべき時代において、サイファーパンクの精神を受け継ぎ、
      暗号技術の力で個人のプライバシーと自由を守るための研究と実践を行っています。
    `
    : `
      The Post-modern Cryptography Institute "ZOMIA" is an organization specializing in cryptographic research and applications.
      
      We are advancing research and development in next-generation cryptographic technologies, which we position as "Post-modern Cryptography," 
      including post-quantum cryptography for the quantum computing era, the fusion of biometric authentication and cryptography, 
      secure computation technologies, and verifiable computation including zero-knowledge proofs.
      
      Until 1995, cryptographic text was synonymous with weapons under export regulations. 
      As governments attempted to access and control people's data, cypherpunks developed grassroots movements 
      to quickly decrypt government-recommended cryptography and expose backdoors.
      
      Today, our world is evolving at an unimaginable pace with the rapid development of AI, 
      the practical application of quantum computers, and brain chip implantation technology. 
      While these technological innovations bring convenience, they also pose potential new threats to individual freedom and rights.
      
      In this era that could be called "Crypto Wars II," ZOMIA inherits the cypherpunk spirit 
      and conducts research and practice to protect individual privacy and freedom through the power of cryptography.
    `;
  
  // メンバー情報（プライバシー保護のため匿名）
  const members = [
    {
      id: 'member1',
      codename: locale === 'ja' ? '研究者α' : 'Researcher Alpha',
      specialty: locale === 'ja' ? 'ゼロ知識証明研究者' : 'Zero Knowledge Proof Researcher',
      description: locale === 'ja' 
        ? '量子耐性のあるゼロ知識証明システムの設計と実装を専門とする。複数の暗号プロトコルの脆弱性を発見。'
        : 'Specializes in the design and implementation of quantum-resistant zero-knowledge proof systems. Has discovered vulnerabilities in multiple cryptographic protocols.'
    },
    {
      id: 'member2',
      codename: locale === 'ja' ? '研究者β' : 'Researcher Beta',
      specialty: locale === 'ja' ? 'ゼロ知識証明研究者' : 'Zero Knowledge Proof Researcher',
      description: locale === 'ja'
        ? '秘密計算と多者間計算プロトコルの効率化に取り組む。プライバシー保護技術の産業応用に詳しい。'
        : 'Works on improving the efficiency of secure computation and multi-party computation protocols. Expert in industrial applications of privacy-preserving technologies.'
    },
    {
      id: 'member3',
      codename: locale === 'ja' ? '研究者γ' : 'Researcher Gamma',
      specialty: locale === 'ja' ? 'ゼロ知識証明研究者' : 'Zero Knowledge Proof Researcher',
      description: locale === 'ja'
        ? '生体認証と暗号の融合研究のスペシャリスト。AIと人間を区別するための暗号学的手法を開発。'
        : 'Specialist in the fusion of biometric authentication and cryptography. Develops cryptographic methods to distinguish between AI and humans.'
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
      
      {/* メイン情報セクション */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* サイドバー - ロゴと暗号的な装飾 */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="flex justify-center">
                  <Image
                    src="/images/zomia_logo.svg"
                    alt="ZOMIA"
                    width={180}
                    height={180}
                    className="float-element"
                  />
                </div>
                
                <div className="retro-terminal mt-8">
                  <div className="text-xs">
                    <span className="text-retro">$</span> ./zomia_info.sh<br/>
                    <span className="text-magic">{'>'}</span> {locale === 'ja' ? '設立: 2025年' : 'Established: 2025'}<br/>
                    <span className="text-magic">{'>'}</span> {locale === 'ja' ? '拠点: 秘密' : 'Location: Classified'}<br/>
                    <span className="text-magic">{'>'}</span> {locale === 'ja' ? '研究者: 3名' : 'Researchers: 3'}<br/>
                    <span className="text-magic">{'>'}</span> {locale === 'ja' ? 'ステータス: 活動中' : 'Status: Active'}<br/>
                    <span className="text-retro">$</span> _
                  </div>
                </div>
                
                <div className="cryptic-text text-center mt-8 animate-pulse-slow">
                  {locale === 'ja' ? '暗号戦争IIに備えよ' : 'PREPARE FOR CRYPTO WARS II'}
                </div>
              </div>
            </div>
            
            {/* メインコンテンツ */}
            <div className="md:col-span-2 space-y-12">
              <div className="magic-card">
                <h2 className="text-2xl font-display mb-6 text-accent">
                  {locale === 'ja' ? 'ZOMIAについて' : 'About ZOMIA'}
                </h2>
                
                <div className="space-y-4 whitespace-pre-line">
                  {aboutContent}
                </div>
              </div>
              
              {/* メンバーセクション */}
              <div className="magic-card">
                <h2 className="text-2xl font-display mb-6 text-accent">
                  {locale === 'ja' ? 'メンバー' : 'Members'}
                </h2>
                
                <div className="space-y-8">
                  {members.map((member) => (
                    <div key={member.id} className="border-l-2 border-secondary pl-4 py-2">
                      <h3 className="text-xl font-display text-secondary mb-1">{member.codename}</h3>
                      <div className="text-sm text-accent mb-2">{member.specialty}</div>
                      <p className="opacity-80">{member.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

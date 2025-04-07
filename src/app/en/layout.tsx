import { Metadata } from 'next';
import { Locale } from '../../types';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = (params.locale || 'ja') as Locale;
  
  return {
    title: locale === 'ja' ? 'ZOMIA - 近未来暗号研究所' : 'ZOMIA - Post-modern Cryptography Institute',
    description: locale === 'ja' 
      ? '十分に発達した暗号技術は、魔法と見分けがつかない' 
      : 'Any sufficiently advanced cryptography is indistinguishable from magic',
  };
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

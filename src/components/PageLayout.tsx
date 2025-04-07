'use client';

import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Locale } from '../types';

interface PageLayoutProps {
  children: ReactNode;
  locale?: Locale;
}

export default function PageLayout({ children, locale = 'ja' }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar locale={locale} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}

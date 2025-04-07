import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n-utils';

export default function RootPage() {
  // Redirect to the default locale
  redirect(`/${i18n.defaultLocale}`);
}

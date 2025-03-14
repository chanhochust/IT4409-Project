import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE } from 'src/shared/constants/locale';

export default function RootPage() {
  // Redirect to the default locale
  redirect(`/${DEFAULT_LOCALE}`);
}

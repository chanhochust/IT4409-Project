import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ComponentProps } from 'react';

export function LocaleLink(props: ComponentProps<typeof Link>) {
  const { locale } = useParams<{ locale: string }>();

  const href = props.href instanceof URL ? props.href.toString() : (props.href as string);

  const { children, ...rest } = props;

  return (
    <Link {...rest} href={`/${locale}${href}`}>
      {children}
    </Link>
  );
}

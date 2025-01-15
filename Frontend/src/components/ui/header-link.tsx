import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { HeaderTranslation } from '@/types/header-translation';
import Link from 'next/link';

export type HedaerLinkProps = {
  url: string;
  userId: string;
};

export const HeaderLink = ({ url, userId }: HedaerLinkProps) => {
  const { t } = useLocaleTranslation();
  const isProfile = url === '/profile';
  const urlWithUserId = isProfile ? url + '/' + userId : url;
  return (
    <Link href={urlWithUserId}>
      {t(`${url.replace('/', '') as HeaderTranslation}.header` as const)}
    </Link>
  );
};

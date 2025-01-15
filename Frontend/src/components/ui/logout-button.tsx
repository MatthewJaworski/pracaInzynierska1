'use client';
import Link from 'next/link';
import { Button } from './button';
import { logoutAction } from '@/actions/logout';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useQueryClient } from '@tanstack/react-query';

export const LogoutButton = () => {
  const { t } = useLocaleTranslation();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.invalidateQueries();
    await logoutAction();
  };

  return (
    <Link href="/login">
      <Button onClick={handleLogout} variant="destructive">
        {t('logout')}
      </Button>
    </Link>
  );
};

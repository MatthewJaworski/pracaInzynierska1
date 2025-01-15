'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@/components/ui';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { useDesktop } from '@/hooks/use-desktop';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import Link from 'next/link';
import { Skeleton } from './skeleton';
import { HeaderLink } from './header-link';

type HeaderProps = {
  urls: string[];
  userId: string;
};

export const Header = ({ urls, userId }: HeaderProps) => {
  const { t } = useLocaleTranslation();
  const isDesktop = useDesktop();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-6 w-1/2" />;

  return (
    <Box className="w-max">
      {!isDesktop ? (
        <Box className="flex flex-col lg:flex-row gap-4">
          <Button variant="outline">
            <Link href="/dashboard">{t('dashboard.title')}</Link>
          </Button>
          {urls?.map((url, index) => (
            <Button variant="outline" key={index}>
              <HeaderLink url={url} userId={userId} />
            </Button>
          ))}
        </Box>
      ) : (
        <Menubar>
          <MenubarMenu>
            <Button variant="ghost">
              <Link href="/dashboard">{t('dashboard.title')}</Link>
            </Button>
            {urls?.map((url, index) => (
              <Button variant="ghost" key={index}>
                <HeaderLink url={url} userId={userId} />
              </Button>
            ))}
          </MenubarMenu>
        </Menubar>
      )}
    </Box>
  );
};

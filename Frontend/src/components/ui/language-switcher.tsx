'use client';
import * as React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguageParam } from '@/hooks/use-language-param';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

const languages: { [key: string]: string } = {
  en: 'EN',
  pl: 'PL'
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLanguageParam();
  const { t } = useLocaleTranslation();

  const handleLanguageChange = (selectedLocale: string) => {
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = selectedLocale;
    } else {
      segments.push(selectedLocale);
    }
    const newPathname = segments.join('/');
    const search = new URLSearchParams(searchParams.toString()).toString()
      ? `?${new URLSearchParams(searchParams.toString()).toString()}`
      : '';
    router.push(`${newPathname}${search}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="flex items-center">
          <span>{languages[currentLocale] || currentLocale}</span>
          <span className="sr-only">{t('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.keys(languages).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center ${
              currentLocale === lang ? 'font-bold' : 'font-normal'
            }`}
          >
            {languages[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

'use client';

import * as i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  UseTranslationOptions,
  initReactI18next,
  useTranslation as useTranslationOrg
} from 'react-i18next';

import { cookieName, getOptions, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: any, namespace: any) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator']
    },
    preload: runsOnServerSide ? languages : []
  });

export type AllowedNamespaces = 'common' | 'fields';

export function useTranslation(
  lng: string,
  ns: AllowedNamespaces,
  options?: UseTranslationOptions<undefined>
) {
  const [cookies, setCookie] = useCookies([cookieName]);

  const ret = useTranslationOrg<AllowedNamespaces>(
    ns as AllowedNamespaces,
    options
  );
  const { i18n } = ret;
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);

    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);

    useEffect(() => {
      if (cookies.i18next === lng) return;
      setCookie(cookieName, lng, { path: '/' });
    }, [lng, cookies.i18next]);
  }
  return ret;
}

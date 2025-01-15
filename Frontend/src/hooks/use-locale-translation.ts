import { AllowedNamespaces, useTranslation } from '../i18n/client';
import { useLanguageParam } from './use-language-param';

export const useLocaleTranslation = (namespace?: AllowedNamespaces) => {
  const locale = useLanguageParam();
  const t = useTranslation(locale, namespace ?? 'common').t;
  return { t };
};

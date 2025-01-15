export const fallbackLng = 'pl';
export const languages = [fallbackLng, 'en'];
const defaultNS = 'common';
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}

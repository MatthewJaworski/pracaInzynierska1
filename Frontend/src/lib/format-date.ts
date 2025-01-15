export const localeMap: { [key: string]: string } = {
  en: 'en-US',
  pl: 'pl-PL'
};

export const formatDate = (date: string, locale: string) => {
  return new Date(date).toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

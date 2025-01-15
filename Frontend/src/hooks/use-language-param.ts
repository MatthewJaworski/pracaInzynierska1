'use client';

import { LanguageParam } from '../types/language';
import { useParams } from 'next/navigation';

export const useLanguageParam = () => {
  const params = useParams<LanguageParam>();
  return params?.lang ?? 'pl';
};

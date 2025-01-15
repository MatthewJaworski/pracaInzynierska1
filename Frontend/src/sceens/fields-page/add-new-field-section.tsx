'use client';
import { Box, Button } from '@/components/ui';
import { TypographyH2 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import Link from 'next/link';

export const AddNewFieldSection = () => {
  const { t } = useLocaleTranslation();
  return (
    <Box className="flex justify-end gap-4 flex-wrap">
      <TypographyH2>{t('fields.addPredefinedField')}</TypographyH2>
      <Link href="/fields/create">
        <Button size="lg">{t('fields.createField')}</Button>
      </Link>
    </Box>
  );
};

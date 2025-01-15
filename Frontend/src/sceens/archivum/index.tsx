'use client';
import { TypographyH1 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { ArchivumDocuments } from './archived-documents';
import { Box } from '@/components/ui';

export const Archivum = () => {
  const { t } = useLocaleTranslation();

  return (
    <Box>
      <TypographyH1>{t('archivum.header')}</TypographyH1>
      <ArchivumDocuments />
    </Box>
  );
};

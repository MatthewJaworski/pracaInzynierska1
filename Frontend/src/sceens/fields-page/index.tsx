'use client';
import { TypographyH1 } from '@/components/ui/typography';
import { AddNewFieldSection } from './add-new-field-section';
import { PredefinedFieldList } from './predefined-field-list';
import { Box } from '@/components/ui';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const FieldsOverview = () => {
  const { t } = useLocaleTranslation();

  return (
    <Box>
      <TypographyH1>{t('fields.overview')}</TypographyH1>
      <AddNewFieldSection />
      <PredefinedFieldList />
    </Box>
  );
};

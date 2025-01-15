'use client';
import { Box } from '@/components/ui';
import { TypographyH1 } from '@/components/ui/typography';
import { DocumentHistoryTable } from './document-history-table';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const StudentDashboard = () => {
  const { t } = useLocaleTranslation();
  return (
    <Box>
      <TypographyH1>{t('user.studentDashboard')}</TypographyH1>
      <DocumentHistoryTable />
    </Box>
  );
};

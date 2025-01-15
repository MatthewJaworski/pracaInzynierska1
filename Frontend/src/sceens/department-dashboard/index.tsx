'use client';
import { Box } from '@/components/ui';
import { DocumentsForConsideration } from '../../components/ui/documents-for-consideration';
import { TypographyH1 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type DepartmentWorkerDashboardProps = {
  userId: string;
};

export const DepartmentWorkerDashboard = ({
  userId
}: DepartmentWorkerDashboardProps) => {
  const { t } = useLocaleTranslation();
  return (
    <Box>
      <TypographyH1>{t('documents.allDocuments')}</TypographyH1>
      <DocumentsForConsideration userId={userId} />
    </Box>
  );
};

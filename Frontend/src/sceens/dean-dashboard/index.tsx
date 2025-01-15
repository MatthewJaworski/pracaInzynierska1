'use client';

import { TypographyH1 } from '@/components/ui/typography';
import { DocumentsForConsideration } from '../../components/ui/documents-for-consideration';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type DeanDashboardProps = {
  userId: string;
};

export const DeanDashboard = ({ userId }: DeanDashboardProps) => {
  const { t } = useLocaleTranslation();

  return (
    <div>
      <TypographyH1>{t('documents.allDocuments')}</TypographyH1>
      <DocumentsForConsideration userId={userId} />
    </div>
  );
};

'use client';
import { Button } from '@/components/ui';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { usePrintDocument } from '@/hooks/use-print-document';

export const FileDownload = ({ documentId }: { documentId: string }) => {
  const { printDocumentHandler } = usePrintDocument(documentId);
  const { t } = useLocaleTranslation();
  return (
    <Button onClick={() => printDocumentHandler()}>
      {t('documents.download')}
    </Button>
  );
};

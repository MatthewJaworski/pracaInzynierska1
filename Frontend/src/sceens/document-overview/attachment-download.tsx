'use client';
import { Button } from '@/components/ui';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useDownloadAttachment } from '@/hooks/use-print-attachment';

export const AttachmentDownload = ({
  attachmentId
}: {
  attachmentId: string;
}) => {
  const { downloadAttachmentHandler } = useDownloadAttachment(attachmentId);
  const { t } = useLocaleTranslation();

  return (
    <Button onClick={() => downloadAttachmentHandler()}>
      {t('attachments.download')}
    </Button>
  );
};

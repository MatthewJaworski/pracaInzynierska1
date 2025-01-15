import { Button } from '@/components/ui';
import { ButtonLoading } from '@/components/ui/loading-button';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateDocument } from '@/hooks/use-update-document';

export type RejectButtonProps = {
  documentId: string;
};
export const RejectButton = ({ documentId }: RejectButtonProps) => {
  const { mutateAsync, isPending } = useUpdateDocument();
  const { t } = useLocaleTranslation();

  const handleReject = async () => {
    await mutateAsync({
      id: documentId,
      documentStatus: 'rejected'
    });
  };

  return isPending ? (
    <ButtonLoading />
  ) : (
    <Button onClick={handleReject} variant="destructive">
      {t('reject')}
    </Button>
  );
};

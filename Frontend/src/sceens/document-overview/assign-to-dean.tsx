'use client';
import { Box, Button } from '@/components/ui';
import { TypographyH3 } from '@/components/ui/typography';
import { useGetUsersByRole } from '@/hooks/use-get-user-by-role';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateDocument } from '@/hooks/use-update-document';
import { toast } from 'sonner';

export type AssignToDeanProps = {
  documentId: string;
};

export const AssignToDean = ({ documentId }: AssignToDeanProps) => {
  const { mutateAsync, isPending } = useUpdateDocument();
  const { data: deans } = useGetUsersByRole('dean', 'true');
  const { t } = useLocaleTranslation();

  const handleAssing = async (id: string) => {
    if (!deans?.length) {
      toast.error(t('deanNotFoundError'));
      return;
    }

    await mutateAsync(
      {
        id,
        documentStatus: 'assigned',
        assignedTo: deans[0].id
      },
      {
        onSuccess: () => {
          toast.success(t('documents.assignedToDean'));
        }
      }
    );
  };

  return (
    <Box className="flex gap-4">
      <TypographyH3>{t('documents.assignToDean')}</TypographyH3>
      <Button
        disabled={isPending}
        size="lg"
        onClick={() => handleAssing(documentId)}
      >
        {t('assign')}
      </Button>
    </Box>
  );
};

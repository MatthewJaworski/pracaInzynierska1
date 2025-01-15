'use client';
import { Button } from '@/components/ui';
import { useDeleteTemplate } from '@/hooks/use-delete-template';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const RemoveTemplateButton = ({
  templateId
}: {
  templateId: string;
}) => {
  const { mutateAsync } = useDeleteTemplate(templateId);
  const { t } = useLocaleTranslation();
  return (
    <Button
      variant="destructive"
      onClick={() => {
        mutateAsync();
      }}
    >
      {t('remove')}
    </Button>
  );
};

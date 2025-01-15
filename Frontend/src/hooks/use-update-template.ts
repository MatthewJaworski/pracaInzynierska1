import { UpdateTemplateDto } from '@/types/template';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useQueryKeys } from './use-query-keys';
import { useLocaleTranslation } from './use-locale-translation';

const patchTemplate = (template: UpdateTemplateDto) =>
  axios.patch(`/api/templates/update`, template, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const useUpdateTemplate = (templateId: string) => {
  const { templates, templateData, templatesNames } = useQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useLocaleTranslation();

  return useMutation({
    mutationFn: patchTemplate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: templates });
      await queryClient.refetchQueries({ queryKey: templates });
      await queryClient.invalidateQueries({
        queryKey: templateData(templateId)
      });
      await queryClient.invalidateQueries({
        queryKey: templatesNames
      });
      toast.info(t('template.templateUpdateSuccess'));
    },
    onError: (_error) => {
      toast.error(t('template.templateUpdateError'));
    }
  });
};

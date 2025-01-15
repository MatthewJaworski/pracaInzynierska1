'use client';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useLocaleTranslation } from './use-locale-translation';

export const fetchDeleteTemplate = async (templateId: string) =>
  await axios.delete(`/api/templates/${templateId}`);

export const useDeleteTemplate = (templateId: string) => {
  const { templates, templateData } = useQueryKeys();
  const { t } = useLocaleTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchDeleteTemplate(templateId),
    onMutate: async (templateId: string) => {
      await queryClient.cancelQueries({ queryKey: templates });
      const previousTemplates = queryClient.getQueryData(templates);

      queryClient.setQueryData(templates, (old: any) => {
        return old.filter((template: any) => template.id !== templateId);
      });

      return { previousTemplates };
    },
    onError: (_error, _var, context) => {
      queryClient.setQueryData(templates, context?.previousTemplates);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: templates });
      await queryClient.invalidateQueries({
        queryKey: templateData(templateId)
      });
      toast.success(t('template.templateDeletionNotification'));
    }
  });
};

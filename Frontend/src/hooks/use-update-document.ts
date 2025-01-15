import { UpdateDocumentDto } from '@/types/document';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useQueryKeys } from './use-query-keys';
import { useLocaleTranslation } from './use-locale-translation';

const patchTemplate = (document: UpdateDocumentDto) =>
  axios.put(`/api/document/update`, document);

export const useUpdateDocument = () => {
  const { documents, base64Document, documentData } = useQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useLocaleTranslation();

  return useMutation({
    mutationFn: patchTemplate,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: documents });
      await queryClient.invalidateQueries({ queryKey: ['all-documents'] });
      await queryClient.refetchQueries({ queryKey: ['all-documents'] });
      await queryClient.invalidateQueries({
        queryKey: base64Document(variables.id)
      });
      await queryClient.invalidateQueries({
        queryKey: documentData(variables.id)
      });
      toast.info(t('documents.documentNotificationSuccess'));
    },
    onError: (_error) => {
      toast.error(t('documents.documentNotificationError'));
    }
  });
};

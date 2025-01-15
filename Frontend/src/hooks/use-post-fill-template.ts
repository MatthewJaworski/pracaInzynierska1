import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { FillTempalte } from '@/types/fill-template';

const postFillTemplate = async (data: FillTempalte) => {
  const response = await axios.post('/api/templates/fill', data);
  return response.data;
};

export const usePostFillTemplate = (templateId: string) => {
  const queryClient = useQueryClient();
  const { templateData, documents, saveDocument } = useQueryKeys();

  return useMutation({
    mutationFn: postFillTemplate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: templateData(templateId),
        refetchType: 'all'
      });
      await queryClient.invalidateQueries({
        queryKey: documents,
        refetchType: 'all'
      });
      await queryClient.invalidateQueries({
        queryKey: saveDocument,
        refetchType: 'all'
      });
    }
  });
};

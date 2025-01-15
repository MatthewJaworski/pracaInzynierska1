import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryKeys } from './use-query-keys';
import axios from 'axios';

const postAttachment = async (data: FormData) => {
  const response = await axios.post('/api/document/attachment', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const usePostAttachment = (documentId: string) => {
  const queryClient = useQueryClient();
  const { attachment, documentData, documentById } = useQueryKeys();

  return useMutation({
    mutationFn: postAttachment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: attachment });
      await queryClient.invalidateQueries({
        queryKey: documentData(documentId)
      });
      await queryClient.invalidateQueries({
        queryKey: documentById(documentId)
      });
    }
  });
};

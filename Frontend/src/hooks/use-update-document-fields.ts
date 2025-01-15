import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { FillTempalte } from '@/types/fill-template';

const patchDocumentFields = async (
  data: FillTempalte & { documentId: string }
) => {
  const response = await axios.patch('/api/fields', data);
  return response.data;
};

export const useUpdateDocumentFields = (documentId: string) => {
  const queryClient = useQueryClient();
  const { saveDocument, printDocument, base64Document } = useQueryKeys();

  return useMutation({
    mutationFn: patchDocumentFields,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: saveDocument
      });
      await queryClient.invalidateQueries({
        queryKey: printDocument(documentId)
      });
      await queryClient.invalidateQueries({
        queryKey: base64Document(documentId)
      });
    }
  });
};

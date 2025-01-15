import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { CreatePredefinedField } from '@/types/create-predefined-field';

const postField = async (data: CreatePredefinedField) =>
  await axios.post('/api/fields/predefined', data);

export const usePostPredefinedField = () => {
  const queryClient = useQueryClient();
  const { predefinedField } = useQueryKeys();

  return useMutation({
    mutationFn: postField,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: predefinedField });
      await queryClient.refetchQueries({ queryKey: predefinedField });
    }
  });
};

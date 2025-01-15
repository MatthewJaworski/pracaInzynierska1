import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { CreateTemplate } from '@/types/createTemplate';
import { useRouter } from 'next/navigation';

const postTemplate = async (data: CreateTemplate) => {
  const response = await axios.post('/api/templates/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const usePostTemplate = () => {
  const queryClient = useQueryClient();
  const { templates, templatesNames } = useQueryKeys();
  const router = useRouter();

  return useMutation({
    mutationFn: postTemplate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: templates });
      await queryClient.refetchQueries({ queryKey: templates });
      await queryClient.invalidateQueries({ queryKey: templatesNames });
      router.back();
    }
  });
};

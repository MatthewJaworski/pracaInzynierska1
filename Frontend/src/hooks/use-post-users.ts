import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryKeys } from './use-query-keys';
import axios from 'axios';

const postUsers = async (data: FormData) => {
  const response = await axios.post('/api/user/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const usePostUsers = () => {
  const queryClient = useQueryClient();
  const { users } = useQueryKeys();

  return useMutation({
    mutationFn: postUsers,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: users });
    }
  });
};

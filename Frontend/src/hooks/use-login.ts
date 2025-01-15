import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const postLogin = (loginData: { email: string; password: string }) =>
  axios.post('/api/auth/login', loginData);

export const useLogin = () => {
  const { login } = useQueryKeys();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: login });
      router.push('/dashboard');
    }
  });
};

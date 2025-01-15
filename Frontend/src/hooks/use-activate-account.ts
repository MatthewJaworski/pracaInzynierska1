import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useLocaleTranslation } from './use-locale-translation';
import { useRouter } from 'next/navigation';

type PostActaivateAccountData = {
  token: string;
  password: string;
};

export const postActivateAccount = async (data: PostActaivateAccountData) =>
  await axios.post(`/api/auth/activate`, data);

export const useActivateAccount = () => {
  const queryClient = useQueryClient();
  const { activateAccount } = useQueryKeys();
  const { t } = useLocaleTranslation();
  const router = useRouter();

  return useMutation({
    mutationFn: postActivateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activateAccount });
      toast.success(t('activateAccountInfo.success'));
      router.push('/login');
    },
    onError: () => {
      toast.error(t('activateAccountInfo.error'));
    }
  });
};

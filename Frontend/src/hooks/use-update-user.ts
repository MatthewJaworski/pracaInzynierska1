import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { toast } from 'sonner';
import { User } from '@/types/user';
import { useLocaleTranslation } from './use-locale-translation';

const patchUser = (user: Partial<User>) =>
  axios.patch(`/api/user/update`, user);

export const useUpdateUser = (userId: string) => {
  const { customer } = useQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useLocaleTranslation();

  return useMutation({
    mutationFn: patchUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: customer(userId) });
      toast.info(t('users.userUpdateSuccess'));
    },
    onError: (_error) => {
      toast.error(t('users.userUpdateError'));
    }
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { toast } from 'sonner';
import { useLocaleTranslation } from './use-locale-translation';

export const fetchDeletePredefinedField = async (fieldName: string) =>
  await axios.delete(`/api/fields/predefined`, {
    params: {
      fieldName
    }
  });

export const useDeletePredefinedField = () => {
  const { predefinedField } = useQueryKeys();
  const queryClient = useQueryClient();
  const { t } = useLocaleTranslation();

  return useMutation({
    mutationFn: fetchDeletePredefinedField,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: predefinedField });
      toast.success(t('fields.predefinedFieldDeleteSuccessNotification'));
    }
  });
};

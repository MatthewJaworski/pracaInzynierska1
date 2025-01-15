'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { toast } from 'sonner';

import { useLocaleTranslation } from './use-locale-translation';

const patchPredefinedField = (field: {
  fieldName: string;
  value: string;
  fieldId: string;
}) => axios.patch(`/api/fields/predefined`, field);

export const useUpdatePredefinedField = () => {
  const { predefinedField } = useQueryKeys();
  const { t } = useLocaleTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchPredefinedField,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: predefinedField });
      toast.info(t('predefinedFields.updateFieldNotificationSuccess'));
    },
    onError: (_error) => {
      toast.error(t('predefinedFields.updateFieldNotificationError'));
    }
  });
};

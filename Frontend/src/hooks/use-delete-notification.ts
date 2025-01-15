'use client';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryKeys } from './use-query-keys';

export const fetchDeleteNotification = async (params: { id: string }) =>
  await axios.delete(`/api/notification`, { params });

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { notification } = useQueryKeys();
  return useMutation({
    mutationFn: fetchDeleteNotification,
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey: notification });
      const previousNotifications = queryClient.getQueryData(notification);
      queryClient.setQueryData(notification, (old: any) => {
        return old.filter((notification: any) => notification.id !== params.id);
      });
      return { previousNotifications };
    },
    onError: (_error, _var, context) => {
      queryClient.setQueryData(notification, context?.previousNotifications);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: notification });
    }
  });
};

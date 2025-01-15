import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';
import { Notification, NotificationSearchParams } from '@/types/notification';

export const fetchNotifications = async (params: NotificationSearchParams) => {
  const response = await axios.get<Notification[]>('/api/notification', {
    params
  });
  return response.data;
};

export const useGetNotifications = (params: NotificationSearchParams) => {
  const { notification } = useQueryKeys();
  return useQuery({
    queryKey: notification,
    queryFn: () => fetchNotifications(params),
    staleTime: 0
  });
};

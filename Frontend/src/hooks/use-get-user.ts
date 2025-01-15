import { useQuery } from '@tanstack/react-query';
import { useQueryKeys } from './use-query-keys';
import axios from 'axios';
import { User } from '@/types/user';

export const fetchUser = async (userId: string) => {
  const response = await axios.get<User>(`/api/user/${userId}`);
  return response.data;
};

export const useGetUser = (userId: string) => {
  const { customer } = useQueryKeys();
  return useQuery({
    queryKey: customer(userId),
    queryFn: () => fetchUser(userId)
  });
};

export const fetchCurrentUser = async () => {
  const response = await axios.get<User>('/api/user/me');
  return response.data;
};
export const useGetCurrentUser = () => {
  const { currentUser } = useQueryKeys();
  return useQuery({
    queryKey: currentUser,
    queryFn: fetchCurrentUser
  });
};

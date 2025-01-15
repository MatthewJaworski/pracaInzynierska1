import { useQuery } from '@tanstack/react-query';
import { useQueryKeys } from './use-query-keys';
import axios from 'axios';
import { User } from '@/types/user';
import { Role } from '@/types/role';

export const fetchUser = async (role: Role, safe?: 'true') => {
  const response = await axios.get<User[]>(
    `/api/user/role/${role}?safe=${safe}`
  );
  return response.data;
};

export const useGetUsersByRole = (role: Role, safe?: 'true') => {
  const { usersByRole } = useQueryKeys();
  return useQuery({
    queryKey: usersByRole(role, safe),
    queryFn: () => fetchUser(role, safe)
  });
};

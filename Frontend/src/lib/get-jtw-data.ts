import { cookies } from 'next/headers';
import { parseJwt } from './parse-jwt';
import { Role } from '@/types/role';

export const getJwtData = async () => {
  const token = cookies().get('Authentication')?.value;
  const result = (await parseJwt(token)) ?? { role: '' as Role, userId: '' };

  return result;
};

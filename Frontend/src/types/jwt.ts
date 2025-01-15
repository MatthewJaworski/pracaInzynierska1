import { Role } from './role';

export type JwtPayload = {
  userId: string;
  role: Role;
};

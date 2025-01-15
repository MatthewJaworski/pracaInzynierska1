import { Role } from './role';

export type Comment = {
  id: string;
  documentId: string;
  userId: string;
  content: string;
  userRole: Role;
  userName: string;
  createdDate: string;
};

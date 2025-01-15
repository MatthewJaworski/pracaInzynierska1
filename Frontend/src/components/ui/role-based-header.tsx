import {
  ADMIN_URLS,
  DEPARTMENT_WORKER_URLS,
  STUDENT_URLS
} from '@/constants/urls';
import { Header } from '@/components/ui/header';
import { Role } from '@/types/role';

const headersMap = {
  admin: ADMIN_URLS,
  student: STUDENT_URLS,
  dean: DEPARTMENT_WORKER_URLS,
  'department-worker': DEPARTMENT_WORKER_URLS
};

type RoleBasedHeaderProps = {
  role: Role;
  userId: string;
};

export const RoleBasedHeader = ({ role, userId }: RoleBasedHeaderProps) => {
  const urls = headersMap[role as keyof typeof headersMap];

  return <Header urls={urls} userId={userId} />;
};

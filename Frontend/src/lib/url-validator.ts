import { PUBLIC_URLS, roleConfig } from '@/constants/urls';
import { Role } from '@/types/role';

type UrlValidatorProps = {
  role: Role;
  path: string;
};

export const urlValidator = ({ role, path }: UrlValidatorProps) => {
  if (PUBLIC_URLS.some((publicPath) => path.startsWith(publicPath))) {
    return true;
  }

  const config = roleConfig[role];

  if (!config) {
    return false;
  }

  const isForbidden = config.forbidenUrl.some((forbiddenPath) =>
    path.startsWith(forbiddenPath)
  );

  return !isForbidden;
};

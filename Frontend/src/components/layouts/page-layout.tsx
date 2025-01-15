import { getJwtData } from '@/lib/get-jtw-data';
import { Box } from '../ui';
import { HeaderLayout } from './header-layout';

type AuthoirzedPageLayoutProps = {
  children: React.ReactNode;
};

export const AuthoirzedPageLayout = async ({
  children
}: AuthoirzedPageLayoutProps) => {
  const { role, userId } = await getJwtData();
  return (
    <Box className="flex bg-background flex-col w-full h-dvh">
      <HeaderLayout role={role} userId={userId} />
      {children}
    </Box>
  );
};

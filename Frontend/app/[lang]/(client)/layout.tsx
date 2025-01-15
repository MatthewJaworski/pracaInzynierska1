import { AuthoirzedPageLayout } from '@/components/layouts/page-layout';
import { AuthProvider } from '@/components/providers/auth-provider';

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => (
  <AuthProvider>
    <AuthoirzedPageLayout>{children}</AuthoirzedPageLayout>
  </AuthProvider>
);
export default AuthLayout;

'use client';
import { AuthLayout as Layout } from '@/components/layouts/auth-layout';

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => (
  <Layout>{children}</Layout>
);
export default AuthLayout;

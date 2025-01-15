import { Box, ThemeToggle } from '../ui';
import { LanguageSwitcher } from '../ui/language-switcher';

type AuthLayoutProps = {
  children: React.ReactNode;
};
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box className="flex bg-background flex-col w-full h-dvh">
      <header className="flex items-center p-6 gap-4">
        <ThemeToggle />
        <LanguageSwitcher />
      </header>
      {children}
    </Box>
  );
};

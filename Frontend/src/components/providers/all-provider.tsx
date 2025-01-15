import { AuthProvider } from './auth-provider';
import { AppQueryClientProvider } from './query-client-provider';
import { ThemeProvider } from './theme-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppQueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </AppQueryClientProvider>
  );
};

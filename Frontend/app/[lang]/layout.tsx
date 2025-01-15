import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '../../globals.css';
import { cn } from '@/lib/utils';
import { Language } from '@/types/language';
import { Providers } from '@/components/providers/all-provider';
import { Toaster } from 'sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Deans Docks',
  description: 'Modern way to manage your documents'
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
}>;

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning lang={params.lang}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}

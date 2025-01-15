'use client';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { cn } from '@/lib/utils';

type ButtonLoadingProps = {
  className?: string;
};

export const ButtonLoading = ({ className }: ButtonLoadingProps) => {
  const { t } = useLocaleTranslation();

  const loaderClasses = cn('mr-2 h-4 w-4 animate-spin', className);

  return (
    <Button
      disabled
      className={cn('flex items-center justify-center', className)}
    >
      <Loader2 className={loaderClasses} />
      {t('pleaseWait')}
    </Button>
  );
};

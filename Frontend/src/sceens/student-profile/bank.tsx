'use client';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import Link from 'next/link';

type BankProps = {
  userId: string;
  canEdit?: boolean;
};

export const Bank = ({ userId, canEdit }: BankProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();

  return (
    <Card className="col-span-1 sm:col-span-2">
      <CardHeader>
        <div className="flex">
          <TypographyH3>{t('bankAccount')}</TypographyH3>
          {canEdit && (
            <Button className="ml-auto">
              <Link href="/profile/edit/bank">{t('edit')}</Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        <TypographyP>
          {t('accountName')}: {data?.bankAccount}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('accountNumber')}: {data?.accountNumber}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('currency')}: {data?.accountCurrency}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('bankName')}: {data?.bankName}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

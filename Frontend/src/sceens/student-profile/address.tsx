'use client';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import Link from 'next/link';

type AddressProps = {
  userId: string;
  canEdit?: boolean;
};

export const Address = ({ userId, canEdit }: AddressProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <TypographyH3>{t('address')}</TypographyH3>
          {canEdit && (
            <Button className="ml-auto">
              <Link href="/profile/edit/address">{t('edit')}</Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        <TypographyP>
          {t('city')}: {data?.permanentCity}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('postalCode')}: {data?.permanentPostalCode}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('street')}: {data?.permanentStreet}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('houseNumber')}: {data?.permanentNumber}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

'use client';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import Link from 'next/link';

type CorrespondanceAddressProps = {
  userId: string;
  canEdit?: boolean;
};

export const CorrespondanceAddress = ({
  userId,
  canEdit
}: CorrespondanceAddressProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();
  const city = data?.correspondenceCity ?? data?.permanentCity;
  const postalCode =
    data?.correspondencePostalCode ?? data?.permanentPostalCode;
  const street = data?.correspondenceStreet ?? data?.permanentStreet;
  const number = data?.correspondenceNumber ?? data?.permanentNumber;

  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <TypographyH3>{t('correspondenceAddress')}</TypographyH3>
          {canEdit && (
            <Button className="ml-auto">
              <Link href="/profile/edit/correspondance-address">
                {t('edit')}
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        <TypographyP>
          {t('city')}: {city}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('postalCode')}: {postalCode}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('street')}: {street}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('houseNumber')}: {number}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

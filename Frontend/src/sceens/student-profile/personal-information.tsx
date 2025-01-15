'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

type PersonalInformationProps = {
  userId: string;
};

export const PersonalInformation = ({ userId }: PersonalInformationProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();
  return (
    <Card>
      <CardHeader>
        <TypographyH3>{t('personalInformation')}</TypographyH3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        <TypographyP>
          {t('email')}: {data?.email}
        </TypographyP>
        <Separator />
        <TypographyP>
          {t('phoneNumber')}: {data?.phoneNumber}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

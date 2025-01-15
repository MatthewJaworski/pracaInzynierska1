'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

type StudiesProps = {
  userId: string;
};

export const Studies = ({ userId }: StudiesProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();
  return (
    <Card>
      <CardHeader>
        <TypographyH3>Studies</TypographyH3>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>
          <TypographyP>
            {t('fieldOfStudy')}: {data?.fieldOfStudy}
          </TypographyP>
        </div>
        <Separator />
        <div className="flex flex-col sm:flex-row text-start gap-3">
          <TypographyP>
            {t('year')}: {data?.year}
          </TypographyP>
          <TypographyP>
            {t('semester')}: {data?.semester}
          </TypographyP>
          <TypographyP>
            {t('studyForm')}: {data?.studyForm}
          </TypographyP>
        </div>
      </CardContent>
    </Card>
  );
};

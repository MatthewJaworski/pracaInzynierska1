'use client';
import { Box } from '@/components/ui';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type AssignedToSectionProps = {
  userId: string;
};

export const NotFound = () => {
  const { t } = useLocaleTranslation();

  return (
    <Box>
      <Box className="flex gap-4">
        <TypographyP>{t('documents.notFoundPerson')}</TypographyP>
      </Box>
    </Box>
  );
};

export const AssignedToSection = ({ userId }: AssignedToSectionProps) => {
  const { data } = useGetUser(userId);
  const { t } = useLocaleTranslation();

  if (!data) return <NotFound />;

  const { firstName, lastName } = data;

  return (
    <Box className="flex gap-4">
      <TypographyH2 className="font-bold ">{t('assigned')}:</TypographyH2>
      <TypographyH2>{`${firstName} ${lastName}`}</TypographyH2>
    </Box>
  );
};

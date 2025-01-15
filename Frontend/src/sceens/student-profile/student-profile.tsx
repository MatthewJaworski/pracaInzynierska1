'use client';
import { Box } from '@/components/ui';
import { TypographyH1 } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { PersonalInformation } from './personal-information';
import { Studies } from './studies';
import { Address } from './address';
import { CorrespondanceAddress } from './correspondance-address';
import { Bank } from './bank';

type StudentProfileProps = {
  userId: string;
  visiterId: string;
};

export const StudentProfile = ({ userId, visiterId }: StudentProfileProps) => {
  const { data } = useGetUser(userId);

  if (!data) return null;
  const canEdit = userId === visiterId;

  return (
    <Box>
      <TypographyH1>{`${data?.firstName} ${data?.lastName}`}</TypographyH1>
      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <PersonalInformation userId={userId} />
        <Studies userId={userId} />
        <Address userId={userId} canEdit={canEdit} />
        <CorrespondanceAddress userId={userId} canEdit={canEdit} />
        <Bank userId={userId} canEdit={canEdit} />
      </Box>
    </Box>
  );
};

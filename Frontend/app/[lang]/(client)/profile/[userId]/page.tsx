import { getJwtData } from '@/lib/get-jtw-data';
import { StudentProfile } from '@/sceens/student-profile/student-profile';

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await getJwtData();

  return <StudentProfile userId={params.userId} visiterId={userId} />;
};

export default UserPage;

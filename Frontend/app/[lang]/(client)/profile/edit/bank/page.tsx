import { getJwtData } from '@/lib/get-jtw-data';
import { EditBankCard } from '@/sceens/edit-profile/edit-bank-card';

const EditBankPage = async () => {
  const data = await getJwtData();
  if (!data) return null;
  const { userId } = data;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <EditBankCard userId={userId} />
    </div>
  );
};
export default EditBankPage;

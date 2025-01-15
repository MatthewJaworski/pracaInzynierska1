import { getJwtData } from '@/lib/get-jtw-data';
import { EditAddressCard } from '@/sceens/edit-profile/edit-address-card';

const EditAddressPage = async () => {
  const data = await getJwtData();
  if (!data) return null;
  const { userId } = data;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <EditAddressCard userId={userId} />
    </div>
  );
};
export default EditAddressPage;

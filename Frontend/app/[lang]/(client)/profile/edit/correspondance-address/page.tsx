import { getJwtData } from '@/lib/get-jtw-data';
import { EditCorrespondanceAddressCard } from '@/sceens/edit-profile/edit-correspondance-address-card';

const EditCorrespondanceAddressPage = async () => {
  const data = await getJwtData();
  if (!data) return null;
  const { userId } = data;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <EditCorrespondanceAddressCard userId={userId} />
    </div>
  );
};
export default EditCorrespondanceAddressPage;

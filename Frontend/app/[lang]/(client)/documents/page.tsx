import { getJwtData } from '@/lib/get-jtw-data';
import { Documents } from '@/sceens/documents/document';

const DocumentsPage = async () => {
  const { userId } = await getJwtData();

  return <Documents userId={userId} />;
};
export default DocumentsPage;

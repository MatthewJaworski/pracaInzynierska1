import { getJwtData } from '@/lib/get-jtw-data';
import { DocumentOverview } from '@/sceens/document-overview';

const DocumentOverviewPage = async ({
  params
}: {
  params: { documentId: string };
}) => {
  const userData = await getJwtData();
  return <DocumentOverview documentId={params.documentId} {...userData} />;
};
export default DocumentOverviewPage;

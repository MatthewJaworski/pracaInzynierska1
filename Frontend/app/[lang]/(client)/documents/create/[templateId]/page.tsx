import { CreateDocument } from '@/sceens/create-document/create-document';

const CreateDocumentPage = ({ params }: { params: { templateId: string } }) => {
  return <CreateDocument templateId={params.templateId} />;
};
export default CreateDocumentPage;

import { EditTemplate } from '@/sceens/edit-template/edit-template';

const EditTemplatePage = ({ params }: { params: { templateId: string } }) => {
  return <EditTemplate templateId={params.templateId} />;
};
export default EditTemplatePage;

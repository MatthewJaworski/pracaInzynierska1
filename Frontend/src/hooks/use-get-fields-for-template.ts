import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';
import { TemplateField } from '@/types/template-field';

export const fetchTemplateFields = async (
  templateId: string,
  userType: 'student' | 'dean'
) => {
  const response = await axios.get<TemplateField[]>(
    `/api/fields/${templateId}?for=${userType}`
  );
  return response.data;
};

export const useGetFieldsForTemplate = (
  templateId: string,
  userType: 'student' | 'dean'
) => {
  const { templateData } = useQueryKeys();
  return useQuery({
    queryKey: templateData(templateId),
    queryFn: () => fetchTemplateFields(templateId, userType)
  });
};

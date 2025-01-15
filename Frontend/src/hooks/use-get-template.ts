import { Template } from '@/types/template';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';

export const fetchTemplateData = async (templateId: string) => {
  const response = await axios.get<Template>(`/api/templates/${templateId}`);
  return response.data;
};

export const useGetTemplate = (templateId: string) => {
  const { templateData } = useQueryKeys();

  return useQuery({
    queryKey: templateData(templateId),
    queryFn: () => fetchTemplateData(templateId)
  });
};

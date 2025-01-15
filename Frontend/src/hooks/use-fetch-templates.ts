import { Template } from '@/types/template';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';

export const fetchTemplates = async () => {
  const response = await axios.get<Template[]>('/api/templates');
  return response.data;
};

export const useGetTemplates = () => {
  const { templates } = useQueryKeys();
  return useQuery({
    queryKey: templates,
    queryFn: fetchTemplates
  });
};

import { Template } from '@/types/template';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';

export const fetchTemplatesForStudents = async () => {
  const response = await axios.get<Template[]>('/api/templates/for-students');
  return response.data;
};

export const useGetTemplatesForStudents = () => {
  const { templates } = useQueryKeys();
  return useQuery({
    queryKey: templates,
    queryFn: fetchTemplatesForStudents
  });
};

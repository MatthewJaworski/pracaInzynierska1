import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';

export const fetchTemplatePdfsNames = async () => {
  const response = await axios.get<string[]>('/api/templates/pdfs-names');
  return response.data;
};

export const useGetTemplatePdfsNames = () => {
  const { templatesNames } = useQueryKeys();
  return useQuery({
    queryKey: templatesNames,
    queryFn: fetchTemplatePdfsNames
  });
};

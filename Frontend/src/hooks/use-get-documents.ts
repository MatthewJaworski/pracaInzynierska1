import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { Document } from '@/types/document';

export const fetchDocuments = async () => {
  const response = await axios.get<Document[]>('/api/document');
  return response.data;
};

export const useGetDocuments = () => {
  const { documents } = useQueryKeys();
  return useQuery({
    queryKey: documents,
    queryFn: fetchDocuments
  });
};

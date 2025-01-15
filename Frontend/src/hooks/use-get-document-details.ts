import { Document } from '@/types/document';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';

export const fetchDocumentDetails = async (documentId: string) => {
  const response = await axios.get<Document>(
    `/api/document/details/${documentId}`
  );
  return response.data;
};

export const useGetDocumentDetails = (documentId: string) => {
  const { documentData } = useQueryKeys();

  return useQuery({
    queryKey: documentData(documentId),
    queryFn: () => fetchDocumentDetails(documentId)
  });
};

import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useQuery } from '@tanstack/react-query';
import { Comment } from '@/types/comment';

export const fetchCommentsForDocument = async (documentId: string) => {
  const response = await axios.get<Comment[]>(`/api/comment/${documentId}`);
  return response.data;
};

export const useGetComments = (documentId: string) => {
  const { documentComments } = useQueryKeys();
  return useQuery({
    queryKey: documentComments(documentId),
    queryFn: () => fetchCommentsForDocument(documentId),
    select: (data) =>
      data.sort((a, b) => b.createdDate.localeCompare(a.createdDate))
  });
};

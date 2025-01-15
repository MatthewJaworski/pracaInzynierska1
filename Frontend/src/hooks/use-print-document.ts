import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';

export const fetchDocument = async (documentId: string) => {
  const { data } = await axios.get<{ document: string }>(
    `/api/document/print/${documentId}`,
    { responseType: 'blob' }
  );

  return data;
};

export const useGetDocument = (documentId: string) => {
  const { printDocument } = useQueryKeys();

  return useQuery({
    queryKey: printDocument(documentId),
    queryFn: () => fetchDocument(documentId),
    enabled: false,
    staleTime: 0
  });
};

export const usePrintDocument = (documentId: string) => {
  const { refetch } = useGetDocument(documentId);

  const printDocumentHandler = async () => {
    const { data } = await refetch();

    if (data instanceof Blob) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document_${documentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      console.log('Invalid data format:', data);
    }
  };

  return { printDocumentHandler };
};

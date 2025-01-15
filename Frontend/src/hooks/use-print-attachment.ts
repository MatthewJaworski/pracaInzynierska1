import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';

const getFilenameFromContentDispositionHeader = (header: string) => {
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = filenameRegex.exec(header);
  if (matches != null && matches[1]) {
    return matches[1].replace(/['"]/g, '');
  }
  return 'download';
};

export const fetchAttachmentBlob = async (attachmentId: string) => {
  const response = await axios.get(`/api/document/attachment/${attachmentId}`, {
    responseType: 'blob'
  });

  return {
    data: response.data,
    filename: getFilenameFromContentDispositionHeader(
      response.headers['content-disposition']
    )
  };
};
export const useGetAttachmentBlob = (attachmentId: string) => {
  const { downloadAttachment } = useQueryKeys();

  return useQuery({
    queryKey: downloadAttachment(attachmentId),
    queryFn: () => fetchAttachmentBlob(attachmentId),
    enabled: false,
    staleTime: 0
  });
};

export const useDownloadAttachment = (attachmentId: string) => {
  const { refetch } = useGetAttachmentBlob(attachmentId);

  const downloadAttachmentHandler = async () => {
    const { data } = await refetch();

    if (data && data.data instanceof Blob) {
      const url = window.URL.createObjectURL(data.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        data.filename || `document_${attachmentId}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      console.log('Invalid data format:', data);
    }
  };

  return { downloadAttachmentHandler };
};

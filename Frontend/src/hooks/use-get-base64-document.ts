'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { usePDFJS } from './use-pdf';
import { useLocaleTranslation } from './use-locale-translation';

export const fetchDocument = async (documentId: string) => {
  const { data } = await axios.get<{ base64Pdf: string }>(
    `/api/document/jpeg/${documentId}`
  );

  return data;
};

export const useGetBase64Document = (documentId: string) => {
  usePDFJS();
  const { base64Document } = useQueryKeys();

  return useQuery({
    queryKey: base64Document(documentId),
    queryFn: () => fetchDocument(documentId)
  });
};
export const useShowPDF = (documentId: string) => {
  const { data, isLoading, isError } = useGetBase64Document(documentId);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const { t } = useLocaleTranslation();
  useEffect(() => {
    if (data) {
      const loadingTask = pdfjsLib.getDocument({
        data: atob(data.base64Pdf),
        verbosity: 0
      });
      loadingTask.promise.then(
        (pdf) => {
          pdf.getPage(1).then((page) => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context!,
              viewport: viewport
            };

            page.render(renderContext).promise.then(() => {
              const dataUrl = canvas.toDataURL('image/jpeg');
              setImageDataUrl(dataUrl);
            });
          });
        },
        (reason) => {
          console.error(t('template.pdfDownloadError'), reason);
        }
      );
    }
  }, [data]);

  return { imageDataUrl, isLoading, isError };
};

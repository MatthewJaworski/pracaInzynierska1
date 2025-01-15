import { useEffect } from 'react';

export const usePDFJS = () => {
  useEffect(() => {
    import('pdfjs-dist').then((pdfjsModule) => {
      pdfjsModule.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();
    });
  }, []);
};

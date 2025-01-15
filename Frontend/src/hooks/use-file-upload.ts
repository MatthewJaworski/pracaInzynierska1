'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { toast } from 'sonner';
import { useLocaleTranslation } from './use-locale-translation';

type UseFileUploaderProps = {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  maxSize?: number;
  maxFileCount?: number;
  multiple?: boolean;
};

function isFileWithPreview(file: File): file is File & { preview: string } {
  return 'preview' in file && typeof file.preview === 'string';
}

export function useFileUploader({
  value: valueProp,
  onValueChange,
  onUpload,
  maxFileCount = 1,
  multiple = false
}: UseFileUploaderProps) {
  const [files, setFiles] = useState({
    prop: valueProp ?? [],
    onChange: onValueChange
  });
  const { t } = useLocaleTranslation();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error(t('errors.onlyOneFile'));
        return;
      }

      if ((files?.prop.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(t('errors.toManyFiels', { number: maxFileCount }));
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      const updatedFiles = files.prop ? [...files.prop, ...newFiles] : newFiles;

      setFiles({ ...files, prop: updatedFiles });

      onValueChange?.(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(t('errors.fileRejected', { name: file.name }));
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFileCount
      ) {
        const target =
          updatedFiles.length > 0 ? `${updatedFiles.length} files` : `file`;

        toast.promise(onUpload(updatedFiles), {
          loading: t('dropzone.uploading'),
          success: () => {
            setFiles({ ...files, prop: [] });
            onValueChange?.([]);
            return t('dropzone.uploaded');
          },
          error: t('errors.uploadFailed', { name: target })
        });
      }
    },
    [files, maxFileCount, multiple, onUpload, setFiles]
  );

  const onRemove = (index: number) => {
    if (!files) return;
    const newFiles = files.prop.filter((_: any, i: number) => i !== index);
    setFiles({ ...files, prop: newFiles });
    onValueChange?.(newFiles);
  };

  useEffect(() => {
    return () => {
      if (!files) return;
      files.prop.forEach((file: File) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  return {
    files: files.prop,
    onDrop,
    onRemove
  };
}

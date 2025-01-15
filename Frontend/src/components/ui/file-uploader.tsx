'use client';
import { Cross2Icon, FileTextIcon, UploadIcon } from '@radix-ui/react-icons';
import Dropzone, { DropzoneProps } from 'react-dropzone';
import { Button } from './button';
import { Progress } from '@radix-ui/react-progress';
import { cn, formatBytes } from '@/lib/utils';
import Image from 'next/image';
import { Key } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useFileUploader } from '@/hooks/use-file-upload';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { Box } from './box';

export type FileUploaderProps = {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  resses?: Record<string, number>;
  accept?: DropzoneProps['accept'];
  maxSize?: DropzoneProps['maxSize'];
  maxFileCount?: DropzoneProps['maxFiles'];
  multiple?: boolean;
  disabled?: boolean;
  progresses?: Record<string, number>;
  className?: string;
};

export const FileUploader = (props: FileUploaderProps) => {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = {
      'text/csv': ['.csv']
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const { files, onDrop, onRemove } = useFileUploader({
    value: [],
    onValueChange,
    onUpload,
    maxSize,
    maxFileCount,
    multiple
  });

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;
  const { t } = useLocaleTranslation();
  return (
    <Box className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFileCount}
        multiple={maxFileCount > 1 || multiple}
        disabled={isDisabled}
        {...dropzoneProps}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Box
            {...getRootProps()}
            className={cn(
              'group relative grid h-52 w-full cursor-pointer place-items-center h-max rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDragActive && 'border-muted-foreground/50',
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Box className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <Box className="rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Box>
                <p className="font-medium text-muted-foreground">
                  {t('dropzone.drop')}
                </p>
              </Box>
            ) : (
              <Box className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <UploadIcon
                    className="size-7 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <Box className="flex flex-col gap-px">
                  <p className="font-medium text-muted-foreground">
                    {t('dropzone.dragAndDrop')}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {maxFileCount > 1
                      ? t('dropzone.multipleUpload', {
                          number:
                            maxFileCount === Infinity
                              ? 'multiple'
                              : maxFileCount,
                          size: formatBytes(maxSize)
                        })
                      : t('dropzone.singleUpload', {
                          size: formatBytes(maxSize)
                        })}
                  </p>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Dropzone>
      {valueProp?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <Box className="flex max-h-48 flex-col gap-4">
            {files?.map((file: File, index: Key | null | undefined) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index as number)}
                progress={progresses?.[file.name]}
              />
            ))}
          </Box>
        </ScrollArea>
      ) : null}
    </Box>
  );
};

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

const FileCard = ({ file, progress, onRemove }: FileCardProps) => {
  const { t } = useLocaleTranslation();
  return (
    <div className="relative flex items-center border p-2 rounded-xl gap-2.5">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(file.size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onRemove}
        >
          <Cross2Icon className="size-4" aria-hidden="true" />
          <span className="sr-only">{t('dropzone.removeFile')}</span>
        </Button>
      </div>
    </div>
  );
};

const isFileWithPreview = (file: File): file is File & { preview: string } => {
  return 'preview' in file && typeof file.preview === 'string';
};

type FilePreviewProps = {
  file: File & { preview: string };
};

const FilePreview = ({ file }: FilePreviewProps) => {
  if (file.type.startsWith('image/')) {
    return (
      <Image
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <FileTextIcon
      className="size-10 text-muted-foreground"
      aria-hidden="true"
    />
  );
};

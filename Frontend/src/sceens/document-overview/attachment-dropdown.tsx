'use client';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Button,
  Form
} from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileUploader } from '@/components/ui/file-uploader';
import { ButtonLoading } from '@/components/ui/loading-button';
import { TypographyH1 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { usePostAttachment } from '@/hooks/use-post-attachment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export type AttachmentDropdownProps = {
  documentId: string;
};

export const AttachmentDropdown = ({ documentId }: AttachmentDropdownProps) => {
  const { mutateAsync, isPending } = usePostAttachment(documentId);
  const { t } = useLocaleTranslation();

  const schema = z.object({
    files: z.array(z.any()).nonempty(t('file.fileFieldRequiredError'))
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      files: []
    }
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('documentId', documentId);
    data.files.forEach((file) => formData.append('files', file));

    mutateAsync(formData, {
      onSuccess: () => {
        toast.info(t('file.fileUploadSuccessNotification'));
        form.reset();
      },
      onError: (_error) => {
        toast.error(t('file.fileUploadErrorNotification'));
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <TypographyH1>{t('attachments.addAttachmentTitle')}</TypographyH1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      accept={{
                        'application/pdf': ['.pdf'],
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png']
                      }}
                      maxFileCount={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isPending ? (
              <Button type="submit">{t('upload')}</Button>
            ) : (
              <ButtonLoading />
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

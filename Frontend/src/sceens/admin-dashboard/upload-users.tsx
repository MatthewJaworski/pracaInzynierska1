'use client';
import {
  Box,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FileUploader } from '@/components/ui/file-uploader';
import { ButtonLoading } from '@/components/ui/loading-button';
import { TypographyH1 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { usePostUsers } from '@/hooks/use-post-users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export const UploadUsers = () => {
  const { mutateAsync, isPending } = usePostUsers();
  const { t } = useLocaleTranslation();

  const schema = z.object({
    files: z.array(z.any()).nonempty(t('errors.atLeastOneFile'))
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
    data.files.map((file) => formData.append('files', file));
    mutateAsync(formData, {
      onSuccess: () => {
        toast.info(t('success.addUsers'));
      },
      onError: (_error) => {
        toast.error(t('errors.createUsers'));
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <TypographyH1>{t('uploadUsers.addUsers')}</TypographyH1>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isPending ? (
              <Button type="submit">{t('submit')}</Button>
            ) : (
              <ButtonLoading />
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

'use client';

import { Form, Button } from '@/components/ui';
import { z } from 'zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormTextField } from '@/components/ui/form-text-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { FormFileUploader } from '@/components/ui/form-file-uploader';
import { usePostTemplate } from '@/hooks/use-post-template';
import { toast } from 'sonner';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

const FIVE_MB = 1024 * 1024 * 5;

export const CreateTemplateFile = () => {
  const { mutateAsync: mutateAsyncTemplate } = usePostTemplate();
  const { t } = useLocaleTranslation();

  const formSchema = z.object({
    templateName: z
      .string()
      .min(1, { message: t('fields.fieldRequiredError') }),
    templateDescription: z
      .string()
      .min(1, { message: t('fields.fieldRequiredError') }),
    templateVisible: z.enum(['true', 'false']),
    templateFile: z.array(z.any()).nonempty(t('file.fileFieldRequiredError'))
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateName: '',
      templateDescription: '',
      templateVisible: 'false',
      templateFile: []
    }
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsyncTemplate(
      {
        name: data.templateName,
        description: data.templateDescription,
        visibleForStudents: data.templateVisible === 'true',
        templateFile: data.templateFile[0]
      },
      {
        onSuccess: () => {
          toast.info(t('fields.fieldCreatedNotification'));
        },
        onError: (_error) => {
          toast.error(t('fields.fieldCreationErrorNotification'));
        }
      }
    );
  };

  return (
    <div className="flex justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <TypographyH1>{t('template.createTemplate')}</TypographyH1>
          <TypographyP>{t('file.fileMatchNameText')}</TypographyP>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="flex gap-3 flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormTextField
                control={form.control}
                name="templateName"
                label={t('template.templateName')}
              />
              <FormTextField
                control={form.control}
                name="templateDescription"
                label={t('template.templateDescription')}
              />
              <FormSelectField
                control={form.control}
                name="templateVisible"
                label={t('template.templateVisibleForStudents')}
                options={[
                  { label: t('yes'), value: true },
                  { label: t('no'), value: false }
                ]}
                defaultValue={false}
              />
              <FormFileUploader
                control={form.control}
                name="templateFile"
                label={t('file.templateFile')}
                accept={{ 'application/pdf': ['.pdf'] }}
                maxSize={FIVE_MB}
              />
              <Button type="submit">{t('template.createTemplate')}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

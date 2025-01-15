'use client';

import { Form, Button } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormFileUploader } from '@/components/ui/form-file-uploader';
import { FormSelectField } from '@/components/ui/form-select-field';
import { FormTextField } from '@/components/ui/form-text-field';
import { TypographyH1, TypographyLead } from '@/components/ui/typography';
import { useGetTemplate } from '@/hooks/use-get-template';
import { useGetTemplatePdfsNames } from '@/hooks/use-get-template-pdfs-names';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateTemplate } from '@/hooks/use-update-template';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';

const FIVE_MB = 1024 * 1024 * 5;

type EditTemplateProps = {
  templateId: string;
};

export const EditTemplate = ({ templateId }: EditTemplateProps) => {
  const { data: templateData } = useGetTemplate(templateId);
  const { data: templatesNames } = useGetTemplatePdfsNames();
  const { mutateAsync: updateTemplate } = useUpdateTemplate(templateId);
  const { t } = useLocaleTranslation();

  const formSchema = z
    .object({
      templateName: z.string().min(1, { message: t('errors.required') }),
      templateDescription: z.string().min(1, { message: t('errors.required') }),
      templateVisible: z.enum(['true', 'false']),
      newTemplate: z.enum(['true', 'false']),
      templateFile: z.array(z.any()),
      templateFileName: z.string()
    })
    .refine(
      (data) => data.newTemplate === 'false' || data.templateFile.length > 0,
      {
        path: ['templateFile'],
        message: t('template.atLeastOneFieldRequired')
      }
    );

  const templateFiles =
    templatesNames?.map((fileName) => ({
      label: fileName,
      value: fileName
    })) ?? [];

  const visible =
    (templateData?.visibleForStudents?.toString() as 'true' | 'false') ??
    'false';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateName: templateData?.name ?? '',
      templateDescription: templateData?.description ?? '',
      templateFileName: templateData?.templateFileName ?? '',
      templateVisible: visible,
      templateFile: [],
      newTemplate: 'false'
    }
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      templateName: templateData?.name ?? '',
      templateDescription: templateData?.description ?? '',
      templateFileName: templateData?.templateFileName ?? '',
      templateVisible: visible,
      newTemplate: 'false',
      templateFile: []
    });
  }, [templateData, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateTemplate({
      description: data.templateDescription,
      id: templateId,
      name: data.templateName,
      templateFileName: data.templateFileName,
      visibleForStudents: data.templateVisible === 'true',
      file: data.newTemplate ? data.templateFile[0] : undefined,
      newTemplate: data.newTemplate === 'true'
    });
  };

  const isNewTemplate = form.watch('newTemplate') === 'true';

  return (
    <div className="flex justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <TypographyH1>{t('template.updateTemplate')}</TypographyH1>
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
                  { label: t('yes'), value: 'true' },
                  { label: t('no'), value: 'false' }
                ]}
              />
              <FormSelectField
                control={form.control}
                name="newTemplate"
                label={t('template.newTemplate')}
                options={[
                  { label: t('yes'), value: 'true' },
                  { label: t('no'), value: 'false' }
                ]}
              />
              {isNewTemplate ? (
                <FormFileUploader
                  control={form.control}
                  name="templateFile"
                  label={t('template.templateFile')}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxSize={FIVE_MB}
                />
              ) : (
                <FormSelectField
                  control={form.control}
                  name="templateFileName"
                  label={t('template.templateFile')}
                  options={templateFiles}
                />
              )}
              <Button type="submit" size="lg">
                <TypographyLead>{t('template.updateTemplate')}</TypographyLead>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

'use client';
import { Box, Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateDocumentForm } from '@/hooks/use-get-document-form';
import { FormProvider } from 'react-hook-form';
import { FormFieldRenderer } from '../create-document/create-document';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

type DeanFormProps = {
  templateId: string;
  documentId: string;
};

export const DeanForm = ({ templateId, documentId }: DeanFormProps) => {
  const { t } = useLocaleTranslation();

  const { data, form, onSubmit } = useUpdateDocumentForm({
    templateId,
    role: 'dean',
    documentId
  });

  if (!data) {
    return <Box>{t('loading')}</Box>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('decideAndFill')}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            className="flex gap-4 flex-col align-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {data.map((field) => (
              <FormFieldRenderer key={field.fieldName} field={field} />
            ))}
            <Button type="submit">{t('submit')}</Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

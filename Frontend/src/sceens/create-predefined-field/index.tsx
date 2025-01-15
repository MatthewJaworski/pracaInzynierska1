'use client';
import { Button, Form } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormTextField } from '@/components/ui/form-text-field';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { usePostPredefinedField } from '@/hooks/use-post-predefined-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const CreatePredefinedField = () => {
  const { mutateAsync } = usePostPredefinedField();
  const { t } = useLocaleTranslation();

  const formSchema = z.object({
    fieldName: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    value: z.string().min(1, { message: t('fields.fieldRequiredError') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldName: '',
      value: ''
    }
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.info(t('fields.fieldCreatedNotification'));
      },
      onError: (_error) => {
        toast.error(t('fields.fieldCreationErrorNotification'));
      }
    });
  };

  return (
    <div className="flex justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <TypographyH1>{t('fields.createPredefinedFieldTitle')}</TypographyH1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex gap-3 flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormTextField
                control={form.control}
                name="fieldName"
                label={t('fields.name')}
              />
              <FormTextField
                control={form.control}
                name="value"
                label={t('fields.fieldValue')}
              />
              <Button type="submit">{t('fields.createField')}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

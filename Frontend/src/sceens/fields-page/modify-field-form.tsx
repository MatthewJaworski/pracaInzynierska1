'use client';
import { Button, Form } from '@/components/ui';
import { FormTextField } from '@/components/ui/form-text-field';
import { useUpdatePredefinedField } from '@/hooks/use-edit-predefined-field';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { setQueryParam } from '@/lib/set-search-param';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type ModifyFieldFormProps = {
  fieldName: string;
  value: string;
  fieldId: string;
};

export const ModifyFieldForm = ({
  fieldName,
  value,
  fieldId
}: ModifyFieldFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLocaleTranslation();
  const { mutateAsync } = useUpdatePredefinedField();

  const formSchema = z.object({
    fieldName: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    value: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    fieldId: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldName: fieldName,
      value: value,
      fieldId
    }
  });

  const handleCancel = async () => {
    router.replace(
      pathname +
        '?' +
        setQueryParam({ name: 'fieldName', value: '', searchParams })
    );
  };

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync(data, {
      onSuccess: () => {
        handleCancel();
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex gap-3 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormTextField
          dontShowLabel
          control={form.control}
          name="fieldName"
          label={t('fields.name')}
          disabled
          placeholder={t('fields.name')}
        />
        <FormTextField
          dontShowLabel
          control={form.control}
          name="value"
          placeholder={t('fields.fieldValue')}
          label={t('fields.fieldValue')}
        />
        <Button type="submit">{t('submit')}</Button>
        <Button type="button" variant="outline" onClick={handleCancel}>
          {t('cancel')}
        </Button>
      </form>
    </Form>
  );
};

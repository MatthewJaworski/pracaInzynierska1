'use client';

import { Button, Form } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormTextField } from '@/components/ui/form-text-field';
import { ButtonLoading } from '@/components/ui/loading-button';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateUser } from '@/hooks/use-update-user';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type EditBankCardProps = {
  userId: string;
};

export const EditBankCard = ({ userId }: EditBankCardProps) => {
  const { t } = useLocaleTranslation();
  const { data } = useGetUser(userId);
  const { mutateAsync, isPending } = useUpdateUser(userId);

  const formSchema = z.object({
    bankAccount: z.string().min(1, { message: t('errors.required') }),
    accountNumber: z.string().regex(/^\d{8,12}$/, {
      message: t('errors.bankNumberText')
    }),
    accountCurrency: z
      .string()
      .min(3, { message: t('errors.required') })
      .max(3, { message: t('errors.currencyLong') }),
    bankName: z.string().min(1, { message: t('errors.required') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankAccount: data?.bankAccount ?? '',
      accountNumber: data?.accountNumber ?? '',
      accountCurrency: data?.accountCurrency ?? '',
      bankName: data?.bankName ?? ''
    }
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      bankAccount: data?.bankAccount,
      accountNumber: data?.accountNumber,
      accountCurrency: data?.accountCurrency,
      bankName: data?.bankName
    });
  }, [data, reset]);

  const onSubmit = () => {
    const user = { id: userId, ...form.getValues() };
    mutateAsync(user);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t('user.editBankAccount')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              control={form.control}
              name="bankAccount"
              label={t('bankAccount')}
            />
            <FormTextField
              control={form.control}
              name="accountNumber"
              label={t('accountNumber')}
            />
            <FormTextField
              control={form.control}
              name="accountCurrency"
              label={t('currency')}
            />
            <FormTextField
              control={form.control}
              name="bankName"
              label={t('bankName')}
            />
            <div className="mt-4 text-center text-sm">
              {!isPending ? (
                <Button className="w-full" type="submit">
                  {t('saveChanges')}
                </Button>
              ) : (
                <ButtonLoading />
              )}
            </div>
          </form>

          <Link href="/profile">
            <Button
              disabled={isPending}
              variant="outline"
              className="mt-4 w-full"
            >
              {t('cancel')}
            </Button>
          </Link>
        </Form>
      </CardContent>
    </Card>
  );
};

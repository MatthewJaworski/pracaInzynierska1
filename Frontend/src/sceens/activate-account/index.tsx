'use client';
import { Box, Button, Form } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FormTextField } from '@/components/ui/form-text-field';
import { ButtonLoading } from '@/components/ui/loading-button';
import { TypographyH1 } from '@/components/ui/typography';
import { useActivateAccount } from '@/hooks/use-activate-account';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const ActivateAccount = () => {
  const { t } = useLocaleTranslation();
  const { mutateAsync, isPending } = useActivateAccount();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const formSchema = z
    .object({
      password: z.string().min(8, { message: t('errors.password') }),
      confirmPassword: z.string().min(8, { message: t('errors.password') })
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: t('errors.passwordDoesNotMatch'),
          path: ['confirmPassword']
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync({
      token,
      password: data.password
    });
  };

  return (
    <main className="w-full flex flex-col flex-1 justify-center items-center">
      <Card>
        <CardHeader>
          <TypographyH1>{t('activateAccount')}</TypographyH1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormTextField
                type="password"
                control={form.control}
                name="password"
                label={t('password')}
              />
              <FormTextField
                type="password"
                control={form.control}
                name="confirmPassword"
                label={t('confirmPassword')}
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
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

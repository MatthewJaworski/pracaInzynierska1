'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@/components/ui';
import { Box } from '@/components/ui';
import { z } from 'zod';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useLogin } from '@/hooks/use-login';
import { AxiosError } from 'axios';
import { FormTextField } from '@/components/ui/form-text-field';

export default function Home() {
  const { t } = useLocaleTranslation();
  const { mutateAsync } = useLogin();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('errors.required') })
      .email(t('errors.email')),
    password: z.string().min(8, { message: t('errors.password') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { handleSubmit, setError } = form;

  const onSubmit = async (loginData: z.infer<typeof formSchema>) => {
    await mutateAsync(loginData, {
      onError: (error) => {
        if ((error as AxiosError)?.response?.status === 401) {
          setError('email', { message: t('errors.authorization') });
          setError('password', { message: t('errors.authorization') });
        }
      }
    });
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <Box className="flex flex-col justify-center items-center">
        <Box variant="card" className="bg-card p-6">
          <h1 className="font-semibold tracking-tight text-2xl mb-4">
            {t('appName')}
          </h1>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormTextField
                name="email"
                label={t('email')}
                placeholder={t('placeholders.email')}
              />
              <FormTextField
                name="password"
                label={t('password')}
                type="password"
                placeholder={t('placeholders.password')}
              />
              <Button type="submit">{t('submit')}</Button>
            </form>
          </Form>
        </Box>
      </Box>
    </main>
  );
}

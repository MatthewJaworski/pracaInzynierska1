'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/components/ui';
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

type EditAddressCardProps = {
  userId: string;
};

export const EditAddressCard = ({ userId }: EditAddressCardProps) => {
  const { t } = useLocaleTranslation();
  const { data } = useGetUser(userId);
  const { mutateAsync, isPending } = useUpdateUser(userId);

  const formSchema = z.object({
    permanentCity: z.string().min(1, { message: t('errors.required') }),
    permanentPostalCode: z
      .string()
      .min(1, { message: t('fields.fieldRequiredError') })
      .regex(/^\d{2}-\d{3}$/, {
        message: t('errors.postalCodeFormat')
      }),
    permanentStreet: z.string().min(1, { message: t('errors.required') }),
    permanentNumber: z.string().min(1, { message: t('errors.required') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permanentCity: data?.permanentCity ?? '',
      permanentPostalCode: data?.permanentPostalCode ?? '',
      permanentStreet: data?.permanentStreet ?? '',
      permanentNumber: data?.permanentNumber ?? ''
    }
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      permanentCity: data?.permanentCity,
      permanentPostalCode: data?.permanentPostalCode,
      permanentStreet: data?.permanentStreet,
      permanentNumber: data?.permanentNumber
    });
  }, [data, reset]);

  const onSubmit = () => {
    const user = { id: userId, ...form.getValues() };
    mutateAsync(user);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {t('edit')} {t('address')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormTextField
              control={form.control}
              name="permanentCity"
              label={t('city')}
            />
            <FormTextField
              control={form.control}
              name="permanentPostalCode"
              label={t('postalCode')}
            />
            <FormTextField
              control={form.control}
              name="permanentStreet"
              label={t('street')}
            />
            <FormTextField
              control={form.control}
              name="permanentNumber"
              label={t('houseNumber')}
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

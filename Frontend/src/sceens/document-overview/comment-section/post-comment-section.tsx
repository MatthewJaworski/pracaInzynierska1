'use client';
import { Button, Form } from '@/components/ui';
import { FormTextarea } from '@/components/ui/form-textarea';
import { ButtonLoading } from '@/components/ui/loading-button';
import { TypographyLead } from '@/components/ui/typography';
import { useGetUser } from '@/hooks/use-get-user';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { usePostComment } from '@/hooks/use-post-comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type PostCommentSectionProps = {
  documentId: string;
  userId: string;
  userNotificationId: string;
  assignedId: string;
};

export const PostCommentSection = ({
  documentId,
  userId,
  userNotificationId,
  assignedId
}: PostCommentSectionProps) => {
  const { mutateAsync, isPending } = usePostComment();
  const { data: userData } = useGetUser(userId);
  const { t } = useLocaleTranslation();

  const formSchema = z.object({
    content: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    documentId: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    assignedId: z.string().nullable(),
    userName: z.string().min(1, { message: t('fields.fieldRequiredError') }),
    userNotificationId: z
      .string()
      .min(1, { message: t('fields.fieldRequiredError') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      documentId: documentId,
      userName: `${userData?.firstName} ${userData?.lastName}`,
      userNotificationId,
      assignedId
    }
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      content: '',
      documentId: documentId,
      userName: `${userData?.firstName} ${userData?.lastName}`,
      userNotificationId,
      assignedId
    });
  }, [userData, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await mutateAsync(data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <FormTextarea name="content" label={t('comments.enterComment')} />
        {!isPending ? (
          <Button type="submit" size="lg" className="mt-4 ml-auto">
            <TypographyLead>{t('comment')}</TypographyLead>
          </Button>
        ) : (
          <ButtonLoading className="ml-auto" />
        )}
      </form>
    </Form>
  );
};

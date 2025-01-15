'use client';
import { AllComments } from './comment-section';
import { PostCommentSection } from './post-comment-section';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH3 } from '@/components/ui/typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type CommentSectionProps = {
  documentId: string;
  userId: string;
  userNotificationId: string;
  assignedId: string;
};
export const CommentSection = ({
  documentId,
  userId,
  userNotificationId,
  assignedId
}: CommentSectionProps) => {
  const { t } = useLocaleTranslation();
  return (
    <Card>
      <CardHeader>
        <TypographyH3>{t('comments.comments')}</TypographyH3>
      </CardHeader>
      <CardContent>
        <PostCommentSection
          documentId={documentId}
          userId={userId}
          userNotificationId={userNotificationId}
          assignedId={assignedId}
        />
        <AllComments documentId={documentId} />
      </CardContent>
    </Card>
  );
};

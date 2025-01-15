'use client';
import { Box, Button } from '@/components/ui';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/typography';
import { useShowPDF } from '@/hooks/use-get-base64-document';
import { useGetDocumentDetails } from '@/hooks/use-get-document-details';
import { AssignedToSection } from './assigned-to-section';
import { AssignToDean } from './assign-to-dean';
import { Role } from '@/types/role';
import { DeanForm } from './dean-form';
import { Loader2 } from 'lucide-react';
import { ListOfWorkers } from './list-of-workers';
import { AttachmentDropdown } from './attachment-dropdown';
import { AttachmentSection } from './attachment-section';
import { CommentSection } from './comment-section';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { RejectButton } from './reject-button';
import Link from 'next/link';

export type DocumentOverviewProps = {
  documentId: string;
  userId: string;
  role: Role;
};

export const DocumentOverview = ({
  documentId,
  userId,
  role
}: DocumentOverviewProps) => {
  const {
    data,
    isLoading: isDetailsLoading,
    isError: documentDetailsError
  } = useGetDocumentDetails(documentId);
  const { imageDataUrl, isError, isLoading } = useShowPDF(documentId);
  const { t } = useLocaleTranslation();

  if (isLoading || isDetailsLoading)
    return (
      <Box className="flex justify-center">
        <Loader2 className="w-60 h-60 animate-spin" />
      </Box>
    );

  if ((isError || documentDetailsError) && !data)
    return (
      <Box className="flex">
        <TypographyH1>{t('documents.documentDetailsError')}</TypographyH1>
      </Box>
    );

  if (!data) return null;

  const documentAssignedToUser = data?.assignedTo === userId;
  const isDean = role === 'dean';
  const isWorker = role === 'department-worker';
  const isStudent = role === 'student';
  const canAssingToDean = !isDean && documentAssignedToUser;
  const canDecide =
    isDean && data?.assignedTo === userId && data.documentStatus === 'assigned';
  const documentNotResolved =
    data?.documentStatus !== 'rejected' && data?.documentStatus !== 'approved';

  const canReject =
    isWorker &&
    data?.assignedTo === userId &&
    data.documentStatus === 'assigned';

  return (
    <Card>
      <CardHeader>
        <TypographyH1>
          {t('document')} {data?.documentTemplate?.name}
        </TypographyH1>
        <Link href={`/profile/${data.createdBy}`}>
          <Button>Author</Button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {canAssingToDean && <AssignToDean documentId={documentId} />}
        {isDean && (
          <ListOfWorkers assignedTo={data.assignedTo} documentId={data.id} />
        )}
        <AssignedToSection userId={data.assignedTo} />
        <Box className="flex justify-center">
          <Box className="shadow-md w-max">
            {imageDataUrl && <img src={imageDataUrl} alt="Document Image" />}
          </Box>
        </Box>
        <AttachmentSection
          attachments={data.attachments}
          documentId={data.id}
        />
        {canReject && <RejectButton documentId={data.id} />}
        {canDecide && (
          <Box className="flex gap-4 justify-center">
            <DeanForm
              templateId={data.documentTemplate.id}
              documentId={data.id}
            />
          </Box>
        )}
        {isStudent && documentNotResolved && (
          <AttachmentDropdown documentId={data.id} />
        )}
        <CommentSection
          documentId={documentId}
          userId={userId}
          userNotificationId={data.createdBy}
          assignedId={data.assignedTo}
        />
      </CardContent>
    </Card>
  );
};

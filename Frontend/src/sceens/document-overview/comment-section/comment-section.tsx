import { Box } from '@/components/ui';
import { useGetComments } from '@/hooks/use-get-comments';
import { Loader2 } from 'lucide-react';
import { CommentCard } from './comment-card';

export type CommentSectionProps = {
  documentId: string;
};
export const AllComments = ({ documentId }: CommentSectionProps) => {
  const { data, isLoading } = useGetComments(documentId);

  if (isLoading)
    return (
      <Box className="flex justify-center">
        <Loader2 className="w-20 h-20 animate-spin" />
      </Box>
    );

  return (
    <Box className="flex flex-col gap-4">
      {data?.map(({ content, createdDate, userName, id }) => (
        <CommentCard
          key={id}
          content={content}
          createdDate={createdDate}
          userName={userName}
        />
      ))}
    </Box>
  );
};

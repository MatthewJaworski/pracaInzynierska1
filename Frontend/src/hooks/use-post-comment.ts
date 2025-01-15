import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useLocaleTranslation } from './use-locale-translation';
import { Comment } from '@/types/comment';
import { useGetCurrentUser } from './use-get-user';

type PostCommentData = {
  documentId: string;
  content: string;
};
export const postComment = async (data: PostCommentData) =>
  await axios.post(`/api/comment`, data);

export const usePostComment = () => {
  const { comments, documentComments } = useQueryKeys();
  const queryClient = useQueryClient();
  const { data } = useGetCurrentUser();
  const { t } = useLocaleTranslation();

  return useMutation({
    mutationFn: postComment,
    onMutate: async (newComment: PostCommentData) => {
      await queryClient.cancelQueries({
        queryKey: documentComments(newComment.documentId)
      });

      const previousComments = queryClient.getQueryData<Comment[]>(
        documentComments(newComment.documentId)
      );
      const tempId = `temp-${Date.now()}`;

      const optimisticComment: Comment = {
        id: tempId,
        documentId: newComment.documentId,
        content: newComment.content,
        createdDate: new Date().toISOString(),
        userId: data?.id ?? '',
        userName: `${data?.firstName} ${data?.lastName}`,
        userRole: data?.role ?? 'student'
      };
      queryClient.setQueryData<Comment[]>(
        documentComments(newComment.documentId),
        (old = []) => [...old, optimisticComment]
      );

      return { previousComments, tempId };
    },
    onError: (_error, _var, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData<Comment[]>(
          documentComments(_var.documentId),
          context.previousComments
        );
      }
      if (context?.tempId) {
        queryClient.setQueryData<Comment[]>(comments, (old = []) =>
          old.filter((comment) => comment.id !== context.tempId)
        );
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: documentComments(data?.data.documentId)
      });
      queryClient.invalidateQueries({
        queryKey: comments
      });
      toast.success(t('comments.addCommentNotificationSuccess'));
    }
  });
};

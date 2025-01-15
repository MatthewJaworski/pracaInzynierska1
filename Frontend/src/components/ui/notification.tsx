import Link from 'next/link';
import { Box } from './box';
import { X } from 'lucide-react';
import { Button } from './button';
import { TypographyP } from './typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { Notification as NotificationType } from '@/types/notification';

type NotificationProps = {
  notification: NotificationType;
  handleRemoveNotification: (id: string) => void;
};

export const Notification = ({
  notification,
  handleRemoveNotification
}: NotificationProps) => {
  const { t } = useLocaleTranslation();

  const isDocumentId = notification.documentId;

  return isDocumentId ? (
    <Link href={`/documents/${notification.documentId}`}>
      <Box
        key={notification.id}
        className="flex items-center justify-between border-b last:border-none"
      >
        <TypographyP className="text-sm flex-1 min-w-0 break-words">
          {t(`notifications.${notification.content}`, {
            defaultValue: 'Comment not found'
          })}
        </TypographyP>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleRemoveNotification(notification.id);
          }}
          aria-label="Remove Notification"
        >
          <X className="w-4 h-4" />
        </Button>
      </Box>
    </Link>
  ) : (
    <Box
      key={notification.id}
      className="flex items-center justify-between border-b last:border-none"
    >
      <TypographyP className="text-sm flex-1 min-w-0 break-words">
        {t(`notifications.${notification.content}`, {
          defaultValue: 'Comment not found'
        })}
      </TypographyP>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveNotification(notification.id)}
        aria-label="Remove Notification"
      >
        <X className="w-4 h-4" />
      </Button>
    </Box>
  );
};

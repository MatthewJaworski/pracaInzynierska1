'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Notification as NotificationType } from '@/types/notification';
import { Bell } from 'lucide-react';
import { useGetNotifications } from '@/hooks/use-get-notifications';
import { TypographyP } from './typography';
import { useDeleteNotification } from '@/hooks/use-delete-notification';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { Notification } from './notification';

export const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);

  const { data: notifications } = useGetNotifications({});
  const { mutateAsync: removeNotification } = useDeleteNotification();
  const { t } = useLocaleTranslation();

  const hasNotifications = notifications && notifications.length > 0;

  const handleRemoveNotification = async (id: string) => {
    await removeNotification({ id });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <div className="relative">
            <Bell className="w-6 h-6" />
            {hasNotifications && (
              <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-full md:w-max">
        <div className="flex flex-col space-y-2 md:w-max">
          {hasNotifications ? (
            notifications.map((notification: NotificationType) => (
              <Notification
                handleRemoveNotification={handleRemoveNotification}
                notification={notification}
                key={notification.id}
              />
            ))
          ) : (
            <TypographyP className="text-sm text-center text-muted-foreground">
              {t('notifications.noNotifications')}
            </TypographyP>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

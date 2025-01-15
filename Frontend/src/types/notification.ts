export type Notification = {
  id: string;
  userId: string;
  documentId?: string;
  content: string;
};

export type NotificationSearchParams = {
  documentId?: string;
  id?: string;
};

import { Attachment } from './attachment';
import { DocumentStatus } from './document-status';
import { Template } from './template';

export type Document = {
  id: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  assignedTo: string;
  documentStatus: DocumentStatus;
  documentTemplate: Template;
  attachments: Attachment[];
};

export type UpdateDocumentDto = {
  id: string;
  assignedTo?: string;
  documentStatus?: DocumentStatus;
  updatedBy?: string;
};

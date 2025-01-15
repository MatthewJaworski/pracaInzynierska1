import { DocumentsParams } from './use-get-all-documents';
import { PredefinedFieldsParams } from './use-get-predefined-fields';

export const useQueryKeys = () => {
  return {
    activateAccount: ['activate-account'],
    notification: ['notification'],
    attachment: ['attachment'],
    comments: ['comments'],
    login: ['login'],
    currentUser: ['customer'],
    customer: (customerId: string) => [customerId, 'customer'],
    users: ['users'],
    saveDocument: ['document'],
    templates: ['templates'],
    predefinedField: ['predefined-fields'],
    templateData: (templateId: string) => [templateId, 'templates'],
    templatesNames: ['templates-names'],
    documents: ['documents'],
    printDocument: (documentId: string) => [documentId, 'print-document'],
    downloadAttachment: (attachmentId: string) => [
      attachmentId,
      'download-attachment'
    ],
    base64Document: (documentId: string) => [documentId, 'base64Document'],
    allDocuments: (params: DocumentsParams) => ['all-documents', params],
    documentById: (documentId: string) => [documentId, 'document'],
    documentData: (documentId: string) => [documentId, 'document-data'],
    usersByRole: (role: string, safe?: 'true') => [role, 'users', safe],
    getPredefinedFields: (params: PredefinedFieldsParams) => [
      'predefined-fields',
      params
    ],
    documentComments: (documentId: string) => [documentId, 'comments']
  };
};

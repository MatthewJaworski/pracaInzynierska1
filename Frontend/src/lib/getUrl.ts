const apiEndpoints = {
  login: '/auth/login',
  activateUser: '/auth/activate-account',
  refreshTokens: '/auth/refresh',
  getUser: '/api/user',
  registerMany: '/api/user/register/many',
  updateUser: '/api/user/update',
  getTemplates: '/api/template',
  postTemplate: '/api/template/create',
  uploadTemplae: '/api/document/template/pdf/upload',
  getTemplatePdfsNames: '/api/template/pdf',
  getTemplateById: '/api/template',
  updateTemplate: '/api/template/update',
  deleteTemplate: '/api/template/delete',
  forStudentsTemplates: '/api/template/for/student',
  getFieldsForTemplate: '/api/template/pdf/fields',
  fillTemplate: '/api/template/fill',
  printDocument: '/api/document/print',
  getDocumentsForUser: '/api/document/for',
  getAllDocuments: '/api/document/all',
  updateDocument: '/api/document/update',
  getDocumentDetails: '/api/document',
  usersByRole: '/api/user/by/role',
  getPredefinedFields: '/api/fields/predefined',
  postPredefinedField: '/api/fields/predefined-field',
  deletePredefinedField: '/api/fields/predefined',
  updatePredefinedField: '/api/fields/predefined',
  updateDocumentFields: '/api/document/fields/fill',
  addAttachment: '/api/document/attachment',
  downloadAttachment: '/api/document/attachment',
  postComment: '/api/comment',
  getComments: '/api/comment',
  getNotifications: '/api/notification',
  deleteNotification: '/api/notification'
};

const servicesUrls = {
  auth: process.env.AUTH_SERVICE_URL,
  bff: process.env.BFF_SERVICE_URL
};

export const getUrl = (
  key: keyof typeof apiEndpoints,
  service: keyof typeof servicesUrls = 'bff'
) => {
  return servicesUrls[service] + apiEndpoints[key];
};

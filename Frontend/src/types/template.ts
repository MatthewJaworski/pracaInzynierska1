export type Template = {
  id: string;
  name: string;
  description: string;
  visibleForStudents: boolean;
  templateFileName: string;
};

export type UpdateTemplateDto = {
  id: string;
  name?: string;
  description?: string;
  newTemplate: boolean;
  visibleForStudents?: boolean;
  templateFileName?: string;
  file?: any[];
};

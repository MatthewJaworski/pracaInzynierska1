export type Field =
  | 'PDFTextField'
  | 'PDFCheckBox'
  | 'PDFDropdown'
  | 'PDFOptionList'
  | 'PDFRadioGroup'
  | 'PDFSignature';

export type TemplateField = {
  id: string;
  fieldName: string;
  dataType: Field;
  isOptional: boolean;
  isUserData: boolean;
  isPredefined: boolean;
  isForDeanToFill: boolean;
  options?: string[];
};

export type PredefinedField = {
  id: string;
  fieldName: string;
  value: string;
};

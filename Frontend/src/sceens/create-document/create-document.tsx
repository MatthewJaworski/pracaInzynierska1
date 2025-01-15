'use client';
import { Box, Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormCheckBox } from '@/components/ui/form-checkbox';
import { FormRadioGroup } from '@/components/ui/form-radio-group';
import { FormSelectField } from '@/components/ui/form-select-field';
import { SignatureCardForm } from '@/components/ui/form-signature-card';
import { FormTextField } from '@/components/ui/form-text-field';
import { FormTextarea } from '@/components/ui/form-textarea';
import { useDocumentForm } from '@/hooks/use-get-document-form';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { TemplateField } from '@/types/template-field';
import { FormProvider } from 'react-hook-form';

type CreateDocumentProps = {
  templateId: string;
};

const fieldTypeToComponent = {
  PDFTextField: FormTextField,
  PDFSignature: SignatureCardForm,
  PDFRadioGroup: FormRadioGroup,
  PDFCheckBox: FormCheckBox,
  PDFDropdown: FormSelectField,
  PDFOptionList: FormSelectField
};

type FormFieldRendererProps = {
  field: TemplateField;
};

export const FormFieldRenderer = ({ field }: FormFieldRendererProps) => {
  const { t } = useLocaleTranslation('fields');
  const { dataType, fieldName, options, isOptional } = field;
  const Component = fieldTypeToComponent[dataType];

  if (fieldName.toLowerCase().includes('area')) {
    return (
      <FormTextarea
        name={fieldName}
        label={t(`fieldsNames.${fieldName}`, { defaultValue: '' })}
        required={!isOptional}
      />
    );
  }

  if (!Component) {
    console.warn(`No component found for dataType "${dataType}"`);
    return null;
  }

  const componentProps: any = {
    name: fieldName,
    label: t(`fieldsNames.${fieldName}`, { defaultValue: '' }),
    required: !isOptional
  };

  if (dataType === 'PDFRadioGroup') {
    componentProps.options = options;
  }
  if (dataType === 'PDFDropdown' || dataType === 'PDFOptionList') {
    componentProps.options = options?.map((option) => ({
      label: t(`options.${option}`, { defaultValue: '' }),
      value: option
    }));
  }
  if (dataType === 'PDFSignature') {
    componentProps.className = 'max-w-xl';
  }

  return <Component {...componentProps} />;
};

export const CreateDocument = ({ templateId }: CreateDocumentProps) => {
  const { data, form, onSubmit } = useDocumentForm(templateId, 'student');
  const { t } = useLocaleTranslation();
  if (!data) {
    return <Box>{t('loading')}</Box>;
  }

  return (
    <Box className="flex justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{t('documents.createDocumentTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              className="flex gap-4 flex-col "
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {data.map((field) => (
                <FormFieldRenderer key={field.fieldName} field={field} />
              ))}
              <Button type="submit">{t('submit')}</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Box>
  );
};

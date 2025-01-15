'use client';

import { useForm } from 'react-hook-form';
import { useGetFieldsForTemplate } from './use-get-fields-for-template';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TemplateField } from '@/types/template-field';
import { usePostFillTemplate } from './use-post-fill-template';
import { toast } from 'sonner';
import { Role } from '@/types/role';
import { useUpdateDocumentFields } from './use-update-document-fields';
import { useUpdateDocument } from './use-update-document';
import { useLocaleTranslation } from './use-locale-translation';
import { useRouter } from 'next/navigation';

const generateDefaultValues = (fields: TemplateField[]) => {
  return fields?.reduce<Record<string, any>>((acc, field) => {
    const { fieldName, dataType, options } = field;
    if (
      dataType === 'PDFDropdown' ||
      dataType === 'PDFRadioGroup' ||
      dataType === 'PDFOptionList'
    ) {
      acc[fieldName] = options?.[0];
    } else {
      acc[fieldName] = '';
    }
    return acc;
  }, {});
};

export const useGetFieldsValidation = () => {
  const { t } = useLocaleTranslation();

  const fieldToZod = {
    PDFTextField: () =>
      z.string().min(1, { message: t('fields.fieldRequiredError') }),
    PDFCheckBox: () => z.boolean(),
    PDFSignature: () =>
      z.string().min(1, { message: t('fields.signatureRequiredError') }),
    PDFDropdown: (
      values: readonly [string, ...string[]],
      params?: z.RawCreateParams
    ) => {
      if (!values || values.length === 0) {
        throw new Error(t('fields.fieldDropdownPredefinedError'));
      }
      return z.enum(values, params);
    },
    PDFRadioGroup: (
      values: readonly [string, ...string[]],
      params?: z.RawCreateParams
    ) => {
      if (!values || values.length === 0) {
        throw new Error(t('fields.fieldDropdownPredefinedError'));
      }
      return z.enum(values, params);
    },
    PDFOptionList: (
      values: readonly [string, ...string[]],
      params?: z.RawCreateParams
    ) => {
      if (!values || values.length === 0) {
        throw new Error(t('fields.fieldOptionsPredefinedError'));
      }
      return z.enum(values, params);
    }
  };
  return fieldToZod;
};

export const useGenerateSchema = (data?: TemplateField[]) => {
  const { t } = useLocaleTranslation();
  const fieldToZod = useGetFieldsValidation();
  const fieldDataTypes: Record<string, string> = {};
  const schema = data
    ? z.object(
        data?.reduce<Record<string, z.ZodTypeAny>>((acc, field) => {
          const { fieldName, dataType, options } = field;

          fieldDataTypes[fieldName] = dataType;

          if (
            dataType === 'PDFDropdown' ||
            dataType === 'PDFRadioGroup' ||
            dataType === 'PDFOptionList'
          ) {
            if (!options || options.length === 0) {
              throw new Error(
                `Field "${fieldName}" of type "${dataType}" requires predefined values.`
              );
            }
            const schemaBuilder = fieldToZod[dataType];
            acc[fieldName] = schemaBuilder(options as [string, ...string[]], {
              errorMap: () => {
                return { message: t('errorUserType') };
              }
            });
          } else {
            const schemaBuilder = fieldToZod[dataType];
            acc[fieldName] = schemaBuilder();
          }

          return acc;
        }, {})
      )
    : z.object({});

  return { schema, fieldDataTypes };
};

export const useDocumentForm = (
  templateId: string,
  role: 'student' | 'dean'
) => {
  const router = useRouter();
  const { data, ...rest } = useGetFieldsForTemplate(templateId, role);
  const { mutateAsync } = usePostFillTemplate(templateId);
  const { fieldDataTypes, schema } = useGenerateSchema(data);
  const { t } = useLocaleTranslation();

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: generateDefaultValues(data || [])
  });

  const onSubmit = async (data: FormData) => {
    const signatures: Record<string, any> = {};
    const fields: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (fieldDataTypes[key] === 'PDFSignature') {
        signatures[key] = value;
      } else {
        fields[key] = value;
      }
    }

    const structuredData = {
      templateId,
      signatures,
      fields
    };

    await mutateAsync(structuredData, {
      onSuccess: () => {
        toast.info(t('documents.documentSentNotification'));
        router.push('/documents');
      },
      onError: (_error) => {
        toast.error(t('documents.documentSentErrorNotification'));
      }
    });
  };

  return { data, rest, form, onSubmit };
};

export type UpdateDocumentFormProps = {
  templateId: string;
  role: Exclude<Role, 'admin' | 'department-worker'>;
  documentId: string;
};

export const useUpdateDocumentForm = ({
  templateId,
  role,
  documentId
}: UpdateDocumentFormProps) => {
  const { data, ...rest } = useGetFieldsForTemplate(templateId, role);
  const { mutateAsync } = useUpdateDocumentFields(documentId);
  const { mutateAsync: updateDocument } = useUpdateDocument();
  const { fieldDataTypes, schema } = useGenerateSchema(data);
  const { t } = useLocaleTranslation();

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: generateDefaultValues(data || [])
  });

  const onSubmit = async (data: FormData) => {
    const signatures: Record<string, any> = {};
    const fields: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (fieldDataTypes[key] === 'PDFSignature') {
        signatures[key] = value;
      } else {
        fields[key] = value;
      }
    }

    const structuredData = {
      templateId,
      signatures,
      fields,
      documentId
    };

    const isDeanDecision = fields.hasOwnProperty('deanDecide');

    if (isDeanDecision) {
      const deanDecision =
        fields.deanDecide === 'Accept' ? 'approved' : 'rejected';

      await updateDocument(
        {
          id: documentId,
          documentStatus: deanDecision
        },
        {
          onSuccess: () => {
            toast.info(t('fields.fieldSuccessNotification'));
          },
          onError: (_error) => {
            toast.error(t('fields.fieldsErrorNotification'));
          }
        }
      );
    }

    await mutateAsync(structuredData, {
      onSuccess: () => {
        toast.info(t('documents.documentNotificationSuccess'));
      },
      onError: (_error) => {
        toast.error(t('documents.documentNotificationError'));
      }
    });
  };

  return { data, rest, form, onSubmit };
};

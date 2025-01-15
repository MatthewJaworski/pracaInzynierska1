'use client';

import {
  FieldValues,
  UseControllerProps,
  useFormContext
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form';
import { FileUploader, FileUploaderProps } from './file-uploader'; // Adjust the import path accordingly

export type FormFileUploaderProps<TypeFormValues extends FieldValues> =
  UseControllerProps<TypeFormValues> &
    Omit<FileUploaderProps, 'value' | 'onValueChange'> & {
      label: React.ReactNode;
      description?: React.ReactNode;
    };

export const FormFileUploader = <TypeFormValues extends FieldValues>(
  props: FormFileUploaderProps<TypeFormValues>
): JSX.Element => {
  const { control } = useFormContext<TypeFormValues>();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <FileUploader
              {...props}
              value={field.value}
              onValueChange={field.onChange}
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage>{error && error.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

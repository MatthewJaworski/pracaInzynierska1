import {
  FieldValues,
  UseControllerProps,
  useFormContext
} from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form';
import { Textarea } from './textarea';

export type FormTextareaProps<TypeFormValues extends FieldValues> =
  UseControllerProps<TypeFormValues> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      label: React.ReactNode;
      dontShowLabel?: boolean;
    };

export const FormTextarea = <TypeFormValues extends FieldValues>(
  props: FormTextareaProps<TypeFormValues>
): JSX.Element => {
  const { control } = useFormContext<TypeFormValues>();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (...args: any[]) => void
  ) => {
    if (props.onChange) props.onChange(e);
    onChange(e);
  };

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {!props.dontShowLabel && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              {...props}
              onChange={(e) => handleOnChange(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

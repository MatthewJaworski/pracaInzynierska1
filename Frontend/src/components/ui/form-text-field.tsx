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
import { Input } from './input';

export type FormTextFieldProps<TypeFormValues extends FieldValues> =
  UseControllerProps<TypeFormValues> &
    React.InputHTMLAttributes<HTMLInputElement> & {
      label: React.ReactNode;
      pattern?: string;
      dontShowLabel?: boolean;
    };

export const FormTextField = <TypeFormValues extends FieldValues>(
  props: FormTextFieldProps<TypeFormValues>
): JSX.Element => {
  const { control } = useFormContext<TypeFormValues>();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...args: any[]) => void
  ) => {
    if (props.inputMode === 'numeric' && !/^\d*$/.test(e.target.value)) return;
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
            <Input
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

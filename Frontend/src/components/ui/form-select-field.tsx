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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select';

export type FormSelectFieldProps<TypeFormValues extends FieldValues> =
  UseControllerProps<TypeFormValues> & {
    label: React.ReactNode;
    placeholder?: string;
    options: { label: string; value: string | boolean }[];
    description?: React.ReactNode;
  };

export const FormSelectField = <TypeFormValues extends FieldValues>(
  props: FormSelectFieldProps<TypeFormValues>
): JSX.Element => {
  const { control } = useFormContext<TypeFormValues>();

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value || ''}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage>{error && error.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

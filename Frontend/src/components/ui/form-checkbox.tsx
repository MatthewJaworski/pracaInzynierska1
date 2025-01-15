import { CheckboxProps } from '@radix-ui/react-checkbox';
import {
  FieldValues,
  UseControllerProps,
  useController
} from 'react-hook-form';
import { Checkbox } from './checkbox';
import { TypographyP } from './typography';

export type FormCheckboxProps<TypeFormValues extends FieldValues> =
  CheckboxProps &
    UseControllerProps<TypeFormValues> & {
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
      label: string;
    };

export const FormCheckBox = <TypeFormValues extends FieldValues>({
  defaultChecked,
  ...props
}: FormCheckboxProps<TypeFormValues>): JSX.Element => {
  const {
    field: { ref, value, onChange, ...fieldProps },
    fieldState
  } = useController(props);

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    const isChecked = checked === true;
    props.onCheckedChange?.(checked);
    onChange(isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        ref={ref}
        {...props}
        {...fieldProps}
        onCheckedChange={handleCheckedChange}
        checked={value ?? defaultChecked}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.label}
      </label>
      {!!fieldState.error && (
        <TypographyP className="text-destructive font-medium">
          {fieldState.error.message}
        </TypographyP>
      )}
    </div>
  );
};

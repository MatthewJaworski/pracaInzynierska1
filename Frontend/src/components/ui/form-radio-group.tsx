import {
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';
import { TypographyP } from './typography';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type FormRadioGroupProps<TypeFormValues extends FieldValues> =
  RadioGroupProps &
    UseControllerProps<TypeFormValues> & {
      options: string[];
      label?: string;
    };

export const FormRadioGroup = <TypeFormValues extends FieldValues>(
  props: FormRadioGroupProps<TypeFormValues>
): JSX.Element => {
  const { t } = useLocaleTranslation('fields');
  const {
    field: { ref, onChange, ...fieldProps },
    fieldState
  } = useController(props);

  const handleOnChange = (e: string) => {
    if (onChange) onChange(e);
  };

  return (
    <>
      {props.label && (
        <Label className="font-semibold mb-2 block">{props.label}</Label>
      )}
      <RadioGroup {...props} {...fieldProps} onValueChange={handleOnChange}>
        {props.options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>
              {t(`options.${option}`, { defaultValue: '' })}
            </Label>
          </div>
        ))}
        {!!fieldState.error && (
          <TypographyP className="text-destructive font-medium">
            {fieldState.error.message}
          </TypographyP>
        )}
      </RadioGroup>
    </>
  );
};

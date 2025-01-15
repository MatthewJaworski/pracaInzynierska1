'use client';

import { useRef, useState, useEffect, RefObject } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SaveIcon, EraserIcon } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import {
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';
import { TypographyP } from './typography';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export type SignatureCardFormProps<TypeFormValues extends FieldValues> = {
  signatureProps?: React.ComponentProps<typeof SignatureCanvas>;
  className?: string;
} & UseControllerProps<TypeFormValues>;

export const SignatureCardForm = <TypeFormValues extends FieldValues>(
  props: SignatureCardFormProps<TypeFormValues>
) => {
  const canvasRef = useRef<SignatureCanvas>() as RefObject<SignatureCanvas>;
  const imageDataURL = `data:image/png;base64,`;
  const [penColor, setPenColor] = useState('black');
  const { t } = useLocaleTranslation();

  const {
    field: { ref, ...fieldProps },
    fieldState: { error }
  } = useController(props);

  const { onChange, value: isValueSaved } = fieldProps;

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary');

    setPenColor(`hsl(${primaryColor.trim()})`);
    if (canvasRef.current && imageDataURL) {
      canvasRef.current.fromDataURL(imageDataURL);
    }
  }, [canvasRef.current]);

  const handleRemove = async () => {
    canvasRef.current?.clear();
    onChange('');
  };

  const handleSave = async () => {
    const img = canvasRef.current?.toDataURL();
    onChange(img);
  };

  const canvaStyle = isValueSaved ? 'pointer-events-none' : '';

  return (
    <div>
      <Card className={`w-full max-w-md ${props.className}`}>
        <CardHeader>
          <CardTitle>{t('signatureCard.title')}</CardTitle>
        </CardHeader>
        <CardContent className={canvaStyle}>
          <SignatureCanvas
            {...fieldProps}
            {...props.signatureProps}
            penColor={penColor}
            canvasProps={{ style: { width: '100%', height: '100%' } }}
            ref={canvasRef}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRemove} type="button">
            <EraserIcon className="mr-2 h-4 w-4" /> {t('signatureCard.clear')}
          </Button>
          {!isValueSaved && (
            <Button onClick={handleSave} type="button">
              <SaveIcon className="mr-2 h-4 w-4" /> {t('signatureCard.save')}
            </Button>
          )}
        </CardFooter>
      </Card>
      {error && (
        <TypographyP className="text-destructive font-medium">
          {error.message}
        </TypographyP>
      )}
    </div>
  );
};

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { isBase64 } from 'class-validator';

export function IsBase64Values(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBase64Values',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(signatures: any, args: ValidationArguments) {
          if (typeof signatures !== 'object' || signatures === null) {
            return false;
          }
          return Object.values(signatures).every((value) => {
            if (typeof value !== 'string') {
              return false;
            }
            const dataUriPattern = /^data:\w+\/[a-zA-Z+\-.]+;base64,/;
            let base64String = value;
            if (dataUriPattern.test(value)) {
              base64String = value.replace(dataUriPattern, '');
            }
            return isBase64(base64String);
          });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object with base64 string values`;
        },
      },
    });
  };
}

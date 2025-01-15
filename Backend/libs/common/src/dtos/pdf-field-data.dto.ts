import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field } from '../types/fields';

export class PdfFieldData {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  type: Field;
  @IsNotEmpty()
  isUserData: boolean;
  @IsNotEmpty()
  isOptional: boolean;
  @IsNotEmpty()
  isPredefined: boolean;
  @IsNotEmpty()
  isForDeanToFill: boolean;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}

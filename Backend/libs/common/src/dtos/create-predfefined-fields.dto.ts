import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePredefinedField {
  @IsString()
  @IsNotEmpty()
  fieldName: string;
  @IsString()
  @IsNotEmpty()
  value: string;
  @IsString()
  @IsOptional()
  fieldId: string;
}

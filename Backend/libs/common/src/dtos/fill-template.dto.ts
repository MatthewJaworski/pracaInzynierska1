import { IsUUID, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import { IsBase64Values } from '../decorators/is-base64-values.decorator';

export class FillTemplateDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @IsOptional()
  @IsObject()
  @IsBase64Values({ message: 'Each signature must be a base64 string' })
  signatures?: Record<string, string>;

  @IsOptional()
  @IsObject()
  fields?: Record<string, any>;
}

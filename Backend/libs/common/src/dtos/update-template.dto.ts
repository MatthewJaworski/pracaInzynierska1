import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTemplateDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => value === 'true')
  @IsOptional()
  visibleForStudents?: boolean;

  @IsString()
  @IsOptional()
  templateFileName?: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  newTemplate: boolean;
}

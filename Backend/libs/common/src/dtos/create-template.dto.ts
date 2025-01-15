import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  visibleForStudents?: boolean;
}

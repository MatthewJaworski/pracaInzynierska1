import { IsNotEmpty, IsString } from 'class-validator';

export class UploadPDFTemplateDTO {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  fileData: string;
}

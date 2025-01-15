import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  userId: string;
  @IsString()
  @IsOptional()
  documentId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}

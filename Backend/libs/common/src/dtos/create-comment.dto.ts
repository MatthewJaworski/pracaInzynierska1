import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  documentId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsIn(['admin', 'student', 'dean', 'department-worker'])
  userRole: string;
  @IsNotEmpty()
  @IsString()
  userName: string;
  @IsNotEmpty()
  @IsString()
  userNotificationId: string;
  @IsOptional()
  @IsString()
  assignedId: string;
}

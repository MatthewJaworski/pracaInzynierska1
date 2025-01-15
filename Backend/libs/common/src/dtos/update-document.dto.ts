import { IsOptional, IsString, IsIn } from 'class-validator';
import { DocumentStatus } from '../types/document-status';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  @IsIn(['submitted', 'assigned', 'approved', 'rejected'])
  documentStatus?: DocumentStatus;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}

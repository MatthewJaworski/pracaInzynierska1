import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  bankAccount?: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  accountCurrency?: string;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  studyLevel?: string;

  @IsString()
  @IsOptional()
  permanentStreet?: string;

  @IsString()
  @IsOptional()
  permanentCity?: string;

  @IsString()
  @IsOptional()
  permanentPostalCode?: string;

  @IsString()
  @IsOptional()
  permanentNumber?: string;

  @IsString()
  @IsOptional()
  correspondenceStreet?: string;

  @IsString()
  @IsOptional()
  correspondenceCity?: string;

  @IsString()
  @IsOptional()
  correspondencePostalCode?: string;

  @IsString()
  @IsOptional()
  correspondenceNumber?: string;
}

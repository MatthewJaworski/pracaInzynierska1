import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../types/role';
import { Currency } from '../types/currency';
import { FieldOfStudy } from '../types/field-of-study';
import { Semester } from '../types/semester';
import { StudyForm } from '../types/study-form';
import { StudyLevel } from '../types/study-level';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  bankAccount: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsOptional()
  accountCurrency?: Currency;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  albumNumber?: string;

  @IsString()
  @IsOptional()
  fieldOfStudy?: FieldOfStudy;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt()
  @IsOptional()
  semester?: Semester;

  @IsString()
  @IsOptional()
  studyForm?: StudyForm;

  @IsString()
  @IsOptional()
  studyLevel?: StudyLevel;

  @IsString()
  @IsNotEmpty()
  permanentStreet: string;

  @IsString()
  @IsNotEmpty()
  permanentCity: string;

  @IsString()
  @IsNotEmpty()
  permanentPostalCode: string;

  @IsString()
  @IsNotEmpty()
  permanentNumber: string;

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

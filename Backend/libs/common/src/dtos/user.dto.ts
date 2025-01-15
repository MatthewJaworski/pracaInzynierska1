import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';
import { User } from 'libs/common/entities/User';

export class UserDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

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
  accountCurrency?: string;

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
  fieldOfStudy?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsInt()
  @IsOptional()
  semester?: number;

  @IsString()
  @IsOptional()
  studyForm?: string;

  @IsString()
  @IsOptional()
  studyLevel?: string;

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

export const userToDto = (user: User): UserDto => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

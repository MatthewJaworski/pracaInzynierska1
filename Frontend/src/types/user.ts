import { Role } from './role';

export type User = {
  id: string;
  email: string;
  role: Role;
  phoneNumber: string;
  bankAccount: string;
  accountNumber: string;
  accountCurrency?: string;
  bankName?: string;
  firstName: string;
  lastName: string;
  albumNumber?: string;
  fieldOfStudy?: string;
  year?: number;
  semester?: number;
  studyForm?: string;
  studyLevel?: string;
  permanentStreet: string;
  permanentCity: string;
  permanentPostalCode: string;
  permanentNumber: string;
  correspondenceStreet?: string;
  correspondenceCity?: string;
  correspondencePostalCode?: string;
  correspondenceNumber?: string;
};

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column()
  role: string;

  @Column({ length: 15 })
  phoneNumber: string;

  @Column({ length: 50 })
  bankAccount: string;

  @Column({ length: 50 })
  accountNumber: string;

  @Column({ length: 10, nullable: true })
  accountCurrency: string;

  @Column({ length: 50, nullable: true })
  bankName: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 20, nullable: true })
  albumNumber: string;

  @Column({ length: 50, nullable: true })
  fieldOfStudy: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  semester: number;

  @Column({ length: 20, nullable: true })
  studyForm: string;

  @Column({ length: 20, nullable: true })
  studyLevel: string;

  @Column({ length: 100 })
  permanentStreet: string;

  @Column({ length: 50 })
  permanentCity: string;

  @Column({ length: 10 })
  permanentPostalCode: string;

  @Column({ length: 10 })
  permanentNumber: string;

  @Column({ length: 100, nullable: true })
  correspondenceStreet: string;

  @Column({ length: 50, nullable: true })
  correspondenceCity: string;

  @Column({ length: 10, nullable: true })
  correspondencePostalCode: string;

  @Column({ length: 10, nullable: true })
  correspondenceNumber: string;
}

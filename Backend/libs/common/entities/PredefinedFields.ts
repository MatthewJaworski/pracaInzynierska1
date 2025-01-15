import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PredefinedFields {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldName: string; //dean, important persons, etc.

  @Column()
  value: string;
}

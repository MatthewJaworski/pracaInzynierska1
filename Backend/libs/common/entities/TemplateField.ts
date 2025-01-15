import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TemplatesDocuments } from './TemplatesDocuments';
import { DocumentFieldValue } from './DocumentFieldValue';

@Entity()
export class TemplateField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldName: string;

  @Column()
  dataType: string;

  @Column({ default: false })
  isOptional: boolean;

  @Column({ default: false })
  isUserData: boolean;

  @Column({ default: false })
  isPredefined: boolean;

  @Column({ default: false })
  isForDeanToFill: boolean;

  @Column({ type: 'simple-json', nullable: true })
  options?: string[];

  @ManyToOne(() => TemplatesDocuments, (template) => template.templateFields, {
    onDelete: 'CASCADE',
  })
  template: TemplatesDocuments;

  @OneToMany(() => DocumentFieldValue, (fieldValue) => fieldValue.templateField)
  fieldValues: DocumentFieldValue[];
}

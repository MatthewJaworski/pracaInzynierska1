import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Document } from './Document';
import { TemplateField } from './TemplateField';

@Entity()
export class DocumentFieldValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  value: string;

  @ManyToOne(() => Document, (document) => document.fieldValues, {
    onDelete: 'CASCADE',
  })
  document: Document;

  @ManyToOne(
    () => TemplateField,
    (templateField) => templateField.fieldValues,
    {
      onDelete: 'CASCADE',
    },
  )
  templateField: TemplateField;
}

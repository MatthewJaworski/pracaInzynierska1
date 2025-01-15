import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './Document';
import { TemplateField } from './TemplateField';

@Entity()
export class TemplatesDocuments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false }) // Admin can decide if document is visible for students to create
  visibleForStudents: boolean;

  @OneToMany(() => Document, (document) => document.documentTemplate, {
    onDelete: 'CASCADE',
  })
  documents: Document[];

  @Column()
  templateFileName: string;

  @OneToMany(() => TemplateField, (field) => field.template, {
    onDelete: 'CASCADE',
  })
  templateFields: TemplateField[];
}

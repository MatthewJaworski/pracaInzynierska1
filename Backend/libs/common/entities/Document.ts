import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TemplatesDocuments } from './TemplatesDocuments';
import { DocumentFieldValue } from './DocumentFieldValue';
import { Attachment } from './Attachment';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdBy: string; // User ID

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  updatedBy: string; // User ID

  @Column({ nullable: true })
  documentStatus: string;

  @Column({ nullable: true })
  assignedTo: string;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => TemplatesDocuments, (template) => template.documents, {
    onDelete: 'SET NULL',
  })
  documentTemplate: TemplatesDocuments;

  @OneToMany(() => DocumentFieldValue, (fieldValue) => fieldValue.document, {
    onDelete: 'CASCADE',
  })
  fieldValues: DocumentFieldValue[];

  @OneToMany(() => Attachment, (attachment) => attachment.document, {
    onDelete: 'CASCADE',
  })
  attachments: Attachment[];
}

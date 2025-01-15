import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Document } from './Document';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @ManyToOne(() => Document, (document) => document.attachments, {
    onDelete: 'CASCADE',
  })
  document: Document;
}

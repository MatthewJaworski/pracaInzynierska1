import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  documentId: string;

  @Column()
  userId: string;

  @Column()
  content: string;

  @Column()
  userRole: string;

  @Column()
  userName: string;

  @CreateDateColumn()
  createdDate: Date;
}

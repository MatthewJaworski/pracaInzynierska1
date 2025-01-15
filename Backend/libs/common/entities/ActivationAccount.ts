import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ActivationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  activationToken: string;

  @Column()
  expiresAt: Date;
}

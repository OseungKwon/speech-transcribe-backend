import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SpeechResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
} 
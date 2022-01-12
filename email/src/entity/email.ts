import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Email {
  @ObjectIdColumn()
  id: string;

  @Column({ type: 'text', nullable: false })
  to: string;

  @Column({ type: 'array', nullable: false })
  cc: string[];

  @Column({ type: 'array', nullable: false })
  bcc: string[];

  @Column({ type: 'text', nullable: false })
  subject: string;

  @Column({ type: 'text', nullable: false })
  message: string;
}

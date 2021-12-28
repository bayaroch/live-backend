import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 60 })
  @Exclude()
  password: string;

  @Column()
  phone_number: string;

  @Column({ default: 0 })
  @Exclude()
  balance: number;

  @Column({ default: 1 })
  @Exclude()
  type: number;
}

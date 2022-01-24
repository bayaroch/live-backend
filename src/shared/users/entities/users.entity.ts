import { Exclude } from 'class-transformer';
import { Event } from 'src/entities/event.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 60 })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ default: 0 })
  @Exclude()
  balance: number;

  @Column({ default: 1 })
  @Exclude()
  type: number;

  @Column({ default: false })
  @Exclude()
  isConfirmed: boolean;

  @Column()
  @Exclude()
  confirmToken: string;

  @ManyToMany(() => Event, (event) => event.organizers)
  events: Event[];
}

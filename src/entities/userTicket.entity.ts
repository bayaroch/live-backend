import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/shared/users/entities/users.entity';
import { Event } from './event.entity';

@Entity('user_ticket')
export class UserTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Users, (user) => user.id)
  user_id: string;

  @OneToMany(() => Event, (event) => event.id)
  event_id: string;
}

import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Users } from 'src/modules/users/entities/users.entity';
import { Event } from './event.entity';

@Entity('event_organizer')
export class EventOrganizer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Event, (event) => event.id)
  event_id: string;

  @OneToMany(() => Users, (user) => user.id)
  user_id: string;
}

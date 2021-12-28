import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Channel } from './channel.entity';
import { Event } from './event.entity';

@Entity('event_channel')
export class EventChannel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Event, (event) => event.id)
  event_id: string;

  @OneToMany(() => Channel, (channel) => channel.id)
  channel_id: number;
}

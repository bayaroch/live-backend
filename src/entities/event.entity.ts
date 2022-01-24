import { Users } from 'src/shared/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ticket_limit: number;

  @Column()
  ticket_price: number;

  @Column()
  cover_url: string;

  @Column()
  category: number;

  @Column()
  timezone: number;

  @Column()
  event_start: string;

  @Column()
  event_end: string;

  @Column()
  sale_start: string;

  @Column()
  sale_end: string;

  @Column('boolean', { default: false })
  is_deleted: boolean;

  @ManyToMany(() => Users, (user) => user.events, { cascade: true })
  @JoinTable({
    name: 'event_organizers',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  organizers: Users[];

  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }
}

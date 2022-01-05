import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

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
}

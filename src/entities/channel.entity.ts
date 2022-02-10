import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('channel')
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arn: string;

  @Column()
  authorized: boolean;

  @Column()
  ingestEndpoint: string;

  @Column()
  latencyMode: 'NORMAL' | 'LOW' | string;

  @Column()
  playbackUrl: string;

  @Column()
  recordingConfigurationArn: string;

  @Column()
  type: 'BASIC' | 'STANDARD' | string;

  @Column()
  value: string;

  @Column()
  channelArn: string;

  @OneToOne(() => Event)
  @JoinColumn()
  event: Event;
}

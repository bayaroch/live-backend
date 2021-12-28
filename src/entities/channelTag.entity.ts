import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Channel } from './channel.entity';
import { Tag } from './tag.entity';

@Entity('channel_tag')
export class ChannelTag {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Channel, (channel) => channel.id)
  channel_id: number;

  @OneToMany(() => Tag, (tag) => tag.id)
  tag_id: number;
}

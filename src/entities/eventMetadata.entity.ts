import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { MetadataType } from './metadataType.entity';

@Entity('event_metadata')
export class EventMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Event, (event) => event.id)
  event_id: string;

  @OneToMany(() => MetadataType, (metadataType) => metadataType.id)
  metadata_type_id: number;
}

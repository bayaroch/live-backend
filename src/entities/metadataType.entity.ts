import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('metadata_type')
export class MetadataType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unique_id: number;
}

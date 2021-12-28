import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('channel')
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  arn: string;

  @Column()
  authorized: number;

  @Column()
  ingestEndpoint: number;

  @Column()
  latencyMode: string;

  @Column()
  playbackUrl: number;

  @Column()
  recordingConfigurationArn: number;

  @Column()
  type: Date;
}

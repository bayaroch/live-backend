import { IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  event_id: string;
}

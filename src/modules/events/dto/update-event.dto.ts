import { IsNumber, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  ticket_limit: number;
  @IsNumber()
  ticket_price: number;
  @IsString()
  cover_url: string;
  @IsNumber()
  category: number;
  @IsNumber()
  timezone: number;
  @IsString()
  event_start: string;
  @IsString()
  event_end: string;
  @IsString()
  sale_start: string;
  @IsString()
  sale_end: string;
}

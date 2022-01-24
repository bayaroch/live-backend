import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  ticket_limit: number;

  @IsOptional()
  @IsNumber()
  ticket_price: number;

  @IsOptional()
  @IsString()
  cover_url: string;

  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsNumber()
  timezone: number;

  @IsOptional()
  @IsString()
  event_start: string;

  @IsOptional()
  @IsString()
  event_end: string;

  @IsOptional()
  @IsString()
  sale_start: string;

  @IsOptional()
  @IsString()
  sale_end: string;
}

import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/event.entity';
import { AuthModule } from '../auth/auth.module';
import { EventOrganizer } from 'src/entities/eventOrganizer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventOrganizer]), AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

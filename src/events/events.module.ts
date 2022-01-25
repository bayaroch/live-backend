import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/event.entity';
import { AuthModule } from '../auth/auth.module';
import { AwsModule } from 'src/shared/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AuthModule, AwsModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

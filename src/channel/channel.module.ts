import { forwardRef, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { AwsModule } from 'src/shared/aws/aws.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), AwsModule, EventsModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}

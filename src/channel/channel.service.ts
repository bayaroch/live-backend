import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsManagerService } from 'src/shared/aws/aws.service';
import { Users } from 'src/shared/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from 'src/entities/channel.entity';
import { EventsService } from 'src/events/events.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    private readonly eventService: EventsService,
    private readonly awsService: AwsManagerService,
  ) {}
  async create(createChannelDto: CreateChannelDto, user: Users) {
    const event = await this.eventService.findOne(createChannelDto.event_id);
    if (!event.organizers.some((v) => v.id === user.id)) {
      throw new ForbiddenException('You are not organizer');
    }
    const response = await this.awsService.createChannel({
      authorized: false,
      latencyMode: 'NORMAL',
      name: event.id,
      recordingConfigurationArn: '',
      type: 'STANDARD',
    });
    if (!response) {
      throw new UnprocessableEntityException(
        'There was an error while creating channel',
      );
    }
    const data = {
      name: response.channel.name,
      arn: response.channel.arn,
      authorized: response.channel.authorized,
      ingestEndpoint: response.channel.ingestEndpoint,
      latencyMode: response.channel.latencyMode,
      playbackUrl: response.channel.playbackUrl,
      recordingConfigurationArn: response.channel.recordingConfigurationArn,
      type: response.channel.type,
      value: response.streamKey.value,
      channelArn: response.streamKey.channelArn,
    };
    const channel = await this.channelRepository.create(data);
    channel.event = event;
    const res = await this.channelRepository.save(channel);
    return res;
  }

  findAll() {
    const channels = this.channelRepository.find({ relations: ['event'] });
    return channels;
  }

  findOne(id: string) {
    const channel = this.channelRepository.findOne(id, {
      relations: ['event'],
    });
    if (!channel) {
      throw new NotFoundException();
    }
    return channel;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  async remove(arn: string) {
    const channel = await this.channelRepository.findOne({ where: { arn } });
    await this.channelRepository.delete(channel);
    const response = await this.awsService.deleteChannel({ arn });
    return response;
  }

  async list() {
    const activeChannels = await this.awsService.listChannel();
    const channels = await this.findAll();
    const removed = [];
    channels.forEach(async (channel) => {
      if (moment().isAfter(channel.event.event_end)) {
        if (
          activeChannels.channels.some(
            (activeChannel) => activeChannel.arn == channel.arn,
          )
        ) {
          removed.push(channel);
          await this.remove(channel.channelArn);
        }
      }
    });
    return { channels, removed };
  }
}

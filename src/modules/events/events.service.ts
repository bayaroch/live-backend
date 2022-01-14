import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Event } from 'src/entities/event.entity';
import { EventOrganizer } from 'src/entities/eventOrganizer.entity';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventOrganizer)
    private readonly eventOrganizerRepository: Repository<EventOrganizer>,
    private readonly connection: Connection,
  ) {}
  async create(body: CreateEventDto, user: UserEntity) {
    const res = await this.eventRepository.create(body);
    // const queryRunner = this.connection.createQueryRunner();

    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   const res = await queryRunner.manager.create(Event, body);
    //   console.log('res', res);
    //   // await queryRunner.manager.create(EventOrganizer, {event_id});
    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }

    return res;
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async update(id: number, updateEventDto: Partial<UpdateEventDto>) {
    const event = await this.eventRepository.update({ id }, updateEventDto);
    return;
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    if (event.is_deleted) {
      throw new UnprocessableEntityException('Already deleted event');
    }
    await this.eventRepository.update({ id }, { is_deleted: true });
  }
}

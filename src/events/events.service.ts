import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Event } from 'src/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { Users } from '../shared/users/entities/users.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly connection: Connection,
  ) {}
  async create(body: CreateEventDto, user: Users) {
    const event = this.eventRepository.create(body);
    event.organizers = [user];
    const res = await this.eventRepository.save(event);
    return res;
  }

  async findAll(query) {
    const take = query.limit || 10;
    const skip = query.page - 1 || 0;
    const [result, count] = await this.eventRepository.findAndCount({
      where: { is_deleted: false },
      order: { sale_start: 'DESC' },
      take: take,
      skip: skip,
    });
    return { result, count };
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne(id);
    const organizers = await this.connection
      .createQueryBuilder()
      .relation(Event, 'organizers')
      .of(id)
      .loadMany();
    if (!event) {
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }
    if (event.is_deleted) {
      throw new UnprocessableEntityException('Event is deleted');
    }
    return plainToClass(Event, {
      ...event,
      organizers: plainToInstance(Users, organizers),
    });
  }

  async update(id: string, updateEventDto: Partial<UpdateEventDto>) {
    await this.eventRepository.update({ id }, updateEventDto);
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    if (event.is_deleted) {
      throw new UnprocessableEntityException('Already deleted event');
    }
    await this.eventRepository.update({ id }, { is_deleted: true });
  }
}

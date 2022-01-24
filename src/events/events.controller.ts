import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { MyAuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { UserEntity } from '../shared/users/entities/user.entity';
import { plainToClass, plainToInstance } from 'class-transformer';
import { EventEntity } from './entities/event.entity';
import { Users } from '../shared/users/entities/users.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(MyAuthGuard)
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: Users,
  ) {
    const event = await this.eventsService.create(createEventDto, user);
    return plainToClass(EventEntity, {
      ...event,
      organizers: plainToInstance(UserEntity, event.organizers),
    });
  }

  @Get()
  findAll(@Query('limit') limit: string, @Query('page') page: string) {
    const events = this.eventsService.findAll({ limit, page });
    return events;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(MyAuthGuard)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(MyAuthGuard)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}

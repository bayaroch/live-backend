import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { MyAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../users/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(MyAuthGuard)
  async create(
    @Body() createEventDto: CreateEventDto,
    @CurrentUser() user: UserEntity,
  ) {
    const event = await this.eventsService.create(createEventDto, user);
    return event;
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(MyAuthGuard)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(MyAuthGuard)
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}

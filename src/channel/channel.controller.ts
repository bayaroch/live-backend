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
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { MyAuthGuard } from 'src/common/guards/auth.guard';
import { Users } from 'src/shared/users/entities/users.entity';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @UseGuards(MyAuthGuard)
  async create(
    @Body() createChannelDto: CreateChannelDto,
    @CurrentUser() user: Users,
  ) {
    return await this.channelService.create(createChannelDto, user);
  }

  @Get()
  findAll() {
    return this.channelService.findAll();
  }

  @Get('/activeChannels')
  async activeChannels() {
    return await this.channelService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(+id, updateChannelDto);
  }

  @Delete()
  remove(@Body() body: { arn: string }) {
    return this.channelService.remove(body.arn);
  }
}

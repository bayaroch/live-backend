import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { IVS } from 'aws-sdk';

@Injectable()
export class AwsManagerService {
  constructor(@InjectAwsService(IVS) private readonly ivs: IVS) {}

  async createChannel(param: IVS.Channel) {
    const response = await this.ivs.createChannel(param).promise();
    return response;
  }
  async deleteChannel(param: IVS.DeleteChannelRequest) {
    const response = await this.ivs.deleteChannel(param).promise();
    return response;
  }

  async listChannel() {
    const response = await this.ivs.listChannels().promise();
    return response;
  }
}

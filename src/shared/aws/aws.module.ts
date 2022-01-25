import { Global, Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AwsManagerService } from './aws.service';

@Global()
@Module({
  imports: [AwsSdkModule.forFeatures([S3])],
  providers: [AwsManagerService],
  exports: [AwsManagerService],
})
export class AwsModule {}

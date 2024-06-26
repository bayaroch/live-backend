import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './shared/users/users.module';
import { ForgotPasswordModule } from './auth/forgot-password/forgot-password.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { IVS } from 'aws-sdk';
import { AwsModule } from './shared/aws/aws.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: 'eu-west-1',
        },
      },
      services: [IVS],
    }),
    AwsModule,
    UsersModule,
    ForgotPasswordModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD,
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: join(__dirname, 'mails/templates/emails'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    EventsModule,
    AuthModule,
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

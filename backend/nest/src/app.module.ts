import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PotModule } from './pot/pot.module';
import { PotStateModule } from './pot-state/pot-state.module';
import { SpeciesModule } from './species/species.module';
import { UserLoginModule } from './user-login/user-login.module';
import { DeviceModule } from './device/device.module';
import { CalenderModule } from './calender/calender.module';
import { TalkModule } from './talk/talk.module';
import { SentenceModule } from './sentence/sentence.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './file/file.module';
import { SocketModule } from './socket/socket.module';
import { ConfigModule } from '@nestjs/config';
import { TtsModule } from './tts/tts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [UserModule, PotModule, FileModule, SocketModule,
    PotStateModule, SpeciesModule, UserLoginModule, DeviceModule, 
    CalenderModule, TalkModule, SentenceModule,
    // 얘가 있어야 .env 파일을 nest에서 읽을 수 있음
    ConfigModule.forRoot(), ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      synchronize: true,
      // entities의 경로가 잘못되어 있어서 db가 연동이 되지 않았음
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*.ts'],
      subscribers: ['src/subscribers/*.ts'],
    }),
    TtsModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

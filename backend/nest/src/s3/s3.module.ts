import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    MulterModule.register({dest: './uploads'}),ConfigModule,
  ],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}

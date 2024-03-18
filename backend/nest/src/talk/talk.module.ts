import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { SentenceModule } from 'src/sentence/sentence.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Talk]), UserModule, SentenceModule, FileModule],
  controllers: [TalkController],
  providers: [TalkService],
  exports: [TalkService]
})

export class TalkModule{}

import { Module } from '@nestjs/common';
import { SentenceController } from './sentence.controller';
import { SentenceService } from './sentence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sentence } from './sentence.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sentence])],
  controllers: [SentenceController],
  providers: [SentenceService],
  exports: [SentenceService],
})
export class SentenceModule {}

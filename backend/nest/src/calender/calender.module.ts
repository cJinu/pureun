import { Module } from '@nestjs/common';
import { CalenderController } from './calender.controller';
import { CalenderService } from './calender.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calender } from './calender.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports:[TypeOrmModule.forFeature([Calender]), FileModule],
  controllers: [CalenderController],
  providers: [CalenderService],
  exports: [CalenderService],
})
export class CalenderModule {}

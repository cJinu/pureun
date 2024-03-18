import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule {}

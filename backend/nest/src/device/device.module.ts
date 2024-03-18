import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { PotStateModule } from 'src/pot-state/pot-state.module';

@Module({
  imports: [TypeOrmModule.forFeature([Device]),PotStateModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}

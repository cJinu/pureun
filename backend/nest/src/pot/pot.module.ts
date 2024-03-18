import { Module, forwardRef } from '@nestjs/common';
import { PotController } from './pot.controller';
import { PotService } from './pot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { UserModule } from 'src/user/user.module';
import { PotStateModule } from 'src/pot-state/pot-state.module';
import { CalenderModule } from 'src/calender/calender.module';
import { DeviceModule } from 'src/device/device.module';
import { S3Module } from 'src/s3/s3.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pot]), UserModule, CalenderModule, DeviceModule, 
    S3Module, CalenderModule, UserModule, forwardRef(() =>SocketModule),
  forwardRef(() =>PotStateModule)],
  controllers: [PotController],
  providers: [PotService],
  exports:[PotService]

})
export class PotModule {}

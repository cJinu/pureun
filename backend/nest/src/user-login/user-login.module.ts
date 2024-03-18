import { Module } from '@nestjs/common';
import { UserLoginController } from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogin]), UserModule],
  controllers: [UserLoginController],
  providers: [UserLoginService],
  exports: [UserLoginService]
})
export class UserLoginModule {}

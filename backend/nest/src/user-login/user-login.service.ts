import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { Repository } from 'typeorm';
import { LoginDto, LoginReturnDto, UserLoginSaveDto } from './user-login.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UserWithUserLoginDto } from 'src/user/user-req.dto';
import { LoginSaveDto, LoginUserDto } from './user-login.req.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class UserLoginService {
    constructor(
        @InjectRepository(UserLogin) 
        private readonly userLoginRepository: Repository<UserLogin>,
        private readonly userService:UserService){}

    /** 로그인 시 유저 저장하고 로그인 정보 저장 */
    async save(userLogin: LoginUserDto, file?: Express.Multer.File): Promise<string>{
        const {nickname, birth_DT, gender} = userLogin
        const user: CreateUserDto = {nickname, birth_DT, gender, parent_id:null}
        const user_id = await this.userService.save(user, file)
        const {user_name, user_email, user_password} = userLogin
        const login: LoginSaveDto = {user_name, user_email, user_password}
        
        if (!user_id) return 'FAIL'
        login.user_id = user_id
        await this.userLoginRepository.save(login)
        return "SUCCESS"
    }

    async update(user_id: number, userLoginDto: UserLoginSaveDto): Promise<number>{
        await this.userLoginRepository.update(user_id, {...userLoginDto});
        return 1;
    }

    async login(loginDto: LoginDto): Promise<LoginReturnDto>{
        const dto = new LoginReturnDto();
        const user = await this.userLoginRepository.findOne({
            relations: {user: true},
            where: {user_email: loginDto.user_email, user_password: loginDto.user_password},       
        })
        
        if(user == null) throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST)
        dto.user_id = user.user.user_id;
        dto.user_email = user.user_email;
        dto.profile_img_url = user.user.profile_img_url;

        return dto;
    }

    async myInfo(user_id: number): Promise<UserLoginSaveDto>{
        const [dto] = await this.userLoginRepository.find({
            where: {user_id: user_id},
            take: 1
        });
        return plainToInstance(UserLoginSaveDto, dto);
    }

    async create(data: UserWithUserLoginDto): Promise<UserLogin>{
        return await this.userLoginRepository.create(data);
    }
}

import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors, forwardRef } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginReturnDto, UserLoginSaveDto } from './user-login.dto';
import { LoginUserDto } from './user-login.req.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user-login')
@ApiTags('User-login')
@ApiExtraModels(LoginUserDto)
export class UserLoginController {
    constructor(
        private readonly userLoginService: UserLoginService,
    ){}

    @Post('/save')
    @ApiOperation({summary:'유저 및 로그인 정보 저장'})
    @ApiBody({type: LoginUserDto})
    @UseInterceptors(FileInterceptor('profile_img'))
    @ApiOkResponse({type: String, description: 'SUCCESS or FAIL'})
    async userSave(@Body() userLogin: LoginUserDto,
    @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .build({
                fileIsRequired: false,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            })
    ) file?: Express.Multer.File): Promise<String>{
        await this.userLoginService.save(userLogin, file);
        return 'SUCCESS';
    }

    @Put(':user_id')
    @ApiOperation({summary:'이름 & 이메일 & 비밀번호 수정'})
    @ApiBody({type: UserLoginSaveDto})
    @ApiOkResponse({type: String, description: 'SUCCESS or FAIL'})
    async userUpdate(@Param('user_id') user_id: number, userLoginDto: UserLoginSaveDto): Promise<String>{
        await this.userLoginService.update(user_id, userLoginDto);
        return 'SUCCESS';
    }

    @Post()
    @ApiOperation({summary: '로그인'})
    @ApiProperty({type: LoginDto, description: '로그인 실패시 null 리턴'})
    @ApiOkResponse({type:LoginReturnDto})    
    async login(@Body() loginDto: LoginDto): Promise<LoginReturnDto>{
        const result = await this.userLoginService.login(loginDto);
        return result;
    }

    @Get(':user_id')
    @ApiOperation({summary: '자기 정보 조회'})
    @ApiOkResponse({type: UserLoginSaveDto})
    async myInfo(@Param('user_id') user_id: number): Promise<UserLoginSaveDto>{
        return await this.userLoginService.myInfo(user_id);
    }

}

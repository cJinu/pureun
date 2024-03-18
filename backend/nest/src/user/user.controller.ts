import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipe, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ChildSaveDto, CreateUserDto, UpdateUserDto, UserWithUserLoginDto } from './user-req.dto';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiExtraModels } from "@nestjs/swagger";
import { UserDetailDto, UserListDto } from './user-res.dto';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
@ApiExtraModels(UserListDto, CreateUserDto, UpdateUserDto)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get()
    @ApiOperation({summary: '모든 유저 조회'})
    @ApiOkResponse({type:User})
    async findAllUser(): Promise<User[]>{
        return await this.userService.findAllUser();
    }

    @Get('child/:user_id')
    @ApiOperation({ summary: '부모의 아이 모두 조회'})
    @ApiOkResponse({ type:UserListDto, description: '자기자신을 제외한 user_id를 부모로하는 아이들 조회' })
    async findAll(@Param('user_id') user_id:number):Promise<UserListDto[]>{
        return this.userService.findByParent(user_id)
    }
    
    @Get(':user_id')
    @ApiOperation({ summary: '유저 상세 조회' })
    @ApiOkResponse({ type:UserDetailDto, description:'유저 상세 조회' })
    async find(@Param('user_id') user_id:number):Promise<UserDetailDto>{
        return this.userService.find(user_id)
    }

    @Post()
    @ApiBody( { type: CreateUserDto } )
    @ApiOperation({ summary: '유저 등록', description: "이미지는 'profile_img'로 보내기"})
    @ApiOkResponse({ type: String, description:'SUCCESS' })
    @ApiNotFoundResponse({ description:'wrong data request' })
    @UseInterceptors(FileInterceptor('profile_img'))
    async save(
        @Body() user:CreateUserDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) file?: Express.Multer.File): Promise<string>{
        try {
            await this.userService.save(user, file)
            return 'SUCCESS';
        }catch (e){
            return 'FAIL'
        }
    }

    @Post('child')
    @ApiBody( { type: ChildSaveDto } )
    @ApiOperation({ summary: '아이 등록', description: "이미지는 'profile_img'로 보내기"})
    @ApiOkResponse({ type:String, description:'SUCCESS' })
    @ApiNotFoundResponse({ description:'wrong data request' })
    @UseInterceptors(FileInterceptor('profile_img'))
    async saveChild(
        @Body() user:ChildSaveDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) file?: Express.Multer.File): Promise<string>{
        try {
            await this.userService.saveChild(user, file)
            return 'SUCCESS';
        }catch (e){
            return 'FAIL'
        }
    }

    @Put(':user_id')
    @ApiBody( { type: UpdateUserDto } )
    @ApiOperation({ summary: '유저 & 아이 정보 수정', description: "이미지는 'profile_img'로 보내기"})
    @ApiOkResponse({ type: String, description:'SUCCESS'})
    @UseInterceptors(FileInterceptor('profile_img'))
    async update(
        @Param('user_id') user_id:number, @Body('user') user:UpdateUserDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) file?: Express.Multer.File,): Promise<number>{
            return this.userService.update(user_id, user, file)
    }
    
    @Delete(':user_id')
    @ApiOperation({ summary: '유저 정보 삭제'})
    @ApiOkResponse({ type: String, description:'SUCCESS'})
    async delete(@Param('user_id') user_id:number): Promise<String>{
        await this.userService.delete(user_id);
        return 'SUCCESS';
    }

    @Get('create/:user_id')
    @ApiOperation({summary: '부모가 화분 등록시 화분 매핑이 되어있지 않는 아이 출력', description:'화분에 유저를 연결할때 출력해주기 위한 API'})
    @ApiOkResponse({type: UserListDto})
    async unMappingUser(@Param('user_id') user_id: number): Promise<UserListDto[]>{
        return await this.userService.unMappingUser(user_id);
    }   
}

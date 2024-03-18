import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PotService } from './pot.service';
import { Pot } from './pot.entity';
import { CollectionDto, CreatePotDto, PotWithStatusDto, SelectPotDto, UpdatePotDto } from './pot.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SelectCollectionDto } from './pot-res.dto';

@Controller('pot')
@ApiTags('Pot')
export class PotController {
    constructor(private readonly potService:PotService){}

    @Get()
    @ApiOperation({summary: '모든 화분(식물) 상세 조회'})
    @ApiOkResponse({type: SelectPotDto})
    async findAllPot(): Promise<SelectPotDto[]>{
        return await this.potService.findAllPot();
    }

    @Get(':parent_id')
    @ApiOperation({summary: '유저가 가진 모든 화분과 화분의 상태 표시'})
    @ApiOkResponse({type:PotWithStatusDto, description:'식물 정보, 주인의 정보, 현재 상태'})
    async parentUserByStatus(@Param('parent_id') parent_id: number): Promise<PotWithStatusDto[]>{
        return await this.potService.potWithStatus(parent_id);
    }

    @Get('/detail/:pot_id')
    @ApiOperation({ summary: "화분(컬렉션 제외) 상세 조회"})
    @ApiOkResponse({ type:PotWithStatusDto, description:'식물 정보, 주인의 정보, 현재 상태' })
    async potDetail(@Param('pot_id') pot_id: number): Promise<PotWithStatusDto>{
        return await this.potService.potDetail(pot_id);
    }

    @Post()
    @ApiBody({type: CreatePotDto})
    @ApiOperation({ summary: '화분 등록', description: '파일은 pot_img로 보내기'})
    @ApiOkResponse({ type: String, description:'SUCCESS or FAIL' })
    @UseInterceptors(FileInterceptor('pot_img'))
    async save( @Body() createPotDto: CreatePotDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'image'
                })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        ) file?: Express.Multer.File ): Promise<String>{
        this.potService.save(createPotDto, file);
        return `SUCCESS`;
    }

    @Put(':pot_id')
    @ApiBody( { type: UpdatePotDto } )
    @ApiOperation({ summary: '화분 수정', description: '파일은 pot_img로 보내기'})
    @ApiOkResponse({ type:String, description:'SUCCESS or FAIL' })
    @UseInterceptors(FileInterceptor('pot_img'))
    async update( @Param('pot_id') user_id: number, @Body() pot: UpdatePotDto,
    @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'image'
            })
            .build({
                fileIsRequired: false,
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            })
    ) file?: Express.Multer.File ): Promise<String>{
        await this.potService.update(user_id, pot, file);
        return 'SUCCESS';
    }

    @Delete(':pot_id')
    @ApiOperation({ summary: '화분 삭제'})
    @ApiOkResponse({ type: String, description:'SUCCESS or FAIL' })
    async delete(@Param('pot_id') pot_id: number): Promise<String>{
        await this.potService.delete(pot_id);
        return 'SUCCESS';
    }


    @Get('collection/:user_id')
    @ApiOperation({summary: '해당 유저의 모든 컬렉션 조회'})
    @ApiOkResponse({ type: SelectCollectionDto, description:'유저의 컬렉션 정보 조회' })
    async getCollection(@Param('user_id') user_id: number): Promise<SelectCollectionDto>{
        return await this.potService.findCollection(user_id);
    }


    @Put('collection/:pot_id')
    @ApiOperation({summary: '성장완료 되서 컬렉션으로 이동', description: 'Body 없이 pot_id만 전달'})
    @ApiOkResponse({ type: String, description:'SUCCESS or FAIL' })
    async toCollection(@Param('pot_id') pot_id: number): Promise<String>{
        await this.potService.toCollection(pot_id);
        return 'SUCCESS';
    }
}

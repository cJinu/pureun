import { Controller, Get, Param, Put, } from '@nestjs/common';
import { TalkService } from './talk.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TalkDetailDto, TalkListDto } from './talk-res.dto';

@Controller('talk')
@ApiTags('Talk')
export class TalkController {
    constructor(private readonly talkService: TalkService){}

    @Get('/:talk_id')
    @ApiOperation({summary: 'get talk detail with sentences', description:'talk.sentence.audio는 음성파일의 경로'})
    @ApiOkResponse({type:TalkDetailDto})
    async find(@Param('talk_id') talk_id: number): Promise<TalkDetailDto>{
        return await this.talkService.find(talk_id);
    }

    @Get('/all/:user_id')
    @ApiOperation({summary: 'get talk list by user and child', description: '읽지않았다면 read_FG = 0, 읽었다면 read_FG = 1'})
    async findByUserId(@Param('user_id') user_id: number): Promise<TalkListDto[]>{
        return await this.talkService.findByUserId(user_id);
    }

    @Get('/bookmark/:user_id')
    @ApiOperation({summary: 'get bookmarked talk list by user and child', description: '유저가 (+유저의 아이) 좋아요 표시해 둔 대화'})
    async findBookmark(@Param('user_id') user_id: number): Promise<TalkListDto[]>{
        return await this.talkService.findBookmark(user_id);
    }

    @Get('/read/:user_id')
    @ApiOperation({summary: 'get never read talk lis by user and child'})
    async findNoRead(@Param('user_id') user_id:number):Promise<TalkListDto[]>{
        return await this.talkService.findNoRead(user_id);
    }

    @Put('/bookmark/:talk_id')
    @ApiOperation({summary: 'update talk.bookmark', description:'true->false, false->true'})
    async updateBookmark(@Param('talk_id') talk_id:number): Promise<String>{
        return await this.talkService.bookmark(talk_id);
    }
}

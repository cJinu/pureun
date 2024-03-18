import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { Sentence } from "src/sentence/sentence.entity";

@Exclude()
export class TalkListDto{
    @ApiProperty()
    @Type(()=>Number)
    talk_id: number

    @ApiProperty()
    talk_title: string
    
    @ApiProperty()
    @Type(()=>Date)
    talk_DT: Date

    @ApiProperty()
    @Type(()=>Boolean)
    read_FG: boolean

    @ApiProperty()
    @Type(() => Number)
    user_id: number

    @ApiProperty()
    user_profile_img_url: string

    @ApiProperty()
    @Type(() => Number)
    pot_id: number

    @ApiProperty()
    @Type(() => Boolean)
    star_flag: boolean

    @ApiProperty()
    pot_img_url: string
}

@Exclude()
export class TalkDetailDto{
    @ApiProperty()
    @Type(()=>Number)
    talk_id: number

    @ApiProperty()
    talk_title: string

    @ApiProperty()
    @Type(()=>Date)
    talk_DT: Date
    
    @ApiProperty()
    @Type(() => Boolean)
    star_flag: boolean
    
    @ApiProperty()
    @Type(()=>Sentence)
    sentence: Sentence[]
    
    @ApiProperty()
    @Type(() => Number)
    user_id: number

    @ApiProperty()
    user_profile_img_url: string

    @ApiProperty()
    nickname: string;

    @ApiProperty()
    @Type(() => Number)
    pot_id: number

    @ApiProperty()
    pot_img_url: string
}
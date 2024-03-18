import { Exclude, Type } from "class-transformer";

@Exclude()
export class TalkCreateDto{
    talk_title: string

    @Type(()=>Date)
    talk_DT: Date

    @Type(()=>Boolean)
    read_FG?: boolean=false

    @Type(()=>Number)
    pot_id: number
}
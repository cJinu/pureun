import { Exclude, Expose, Type } from "class-transformer";
import { IsString, IsDate, IsNumber} from 'class-validator';
import { Sentence } from "src/sentence/sentence.entity";

@Exclude()
export class TalkDto{
    @Expose()
    @IsString()
    talk_title: string;

    @Expose()
    @IsDate()
    talk_DT: Date;

    @Expose()
    @IsNumber()
    read_FG: number;

    @Expose()
    @Type(() => Sentence)
    sentence: Sentence[];
}

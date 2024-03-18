import { Type } from "class-transformer";

export class SentenceCreateDto{
    content: string;

    talker: string;

    @Type(()=>Number)
    talk_id: number;

    audio: string;
}
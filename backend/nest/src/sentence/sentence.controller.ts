import { Body, Controller, Post } from '@nestjs/common';
import { SentenceService } from './sentence.service';

@Controller('sentence')
export class SentenceController {
    constructor(private readonly sentenceService: SentenceService){}

    @Post()
    async getAnswer(@Body() gpt: any): Promise<string>{
        return await this.sentenceService.answer(gpt.content); 
    }
    
}

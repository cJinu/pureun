import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from "openai";
import { Sentence } from './sentence.entity';
import { Repository } from 'typeorm';
import { SentenceCreateDto } from './sentence-req.dto';

@Injectable()
export class SentenceService {
    constructor(
        @InjectRepository(Sentence) 
        private readonly sentenceRepository: Repository<Sentence>,
    ){}

    openai: any = new OpenAI({
        organization: 'org-XvLEOTgNTjznmJI9U3UnwBOk',
        apiKey:process.env.GPT_API_KEY
    });
        
    system_role = '당신은 식물이다. 순수한 마음을 가졌으며 항상 따뜻하게 상대방을 대한다.'
    my_role = "항상 나에게 반말로 대답하고 40글자 이내로 말을 해, 너는 식물이야"
    assistance_role = "난 이제부터 너에게 반말로 대답할거고 마치 어린아이처럼 너를 대할거야"

    // 프롬프트 수정을 위해서 user_id를 받아와야 함
    async answer(sentence: string): Promise<string> {
        
        const completion = await this.openai.chat.completions.create({
            messages: [{"role": "system", "content": this.system_role},
                {"role": "user", "content": this.my_role},
                {"role": "assistant", "content": this.assistance_role},
                {"role": "user", "content": sentence}],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0].message.content;
    }

    /** sentence save from redis to mysql */
    async save(dto: SentenceCreateDto): Promise<string>{
        try {
            await this.sentenceRepository.save(dto)
            return "success"
        } catch (e) {
            return "fail"
        }
    }

    async nestSentenceId(talk_id: number): Promise<number>{
        let res = await this.sentenceRepository.countBy({talk_id})
        res += 1
        return res
    }
}

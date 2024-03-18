import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './talk.entity';
import { Repository } from 'typeorm';
import { TalkDetailDto, TalkListDto } from './talk-res.dto';
import { FileService } from './../file/file.service';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class TalkService {
    constructor(
        @InjectRepository(Talk) 
        private readonly talkRepository: Repository<Talk>,
        private readonly fileService: FileService,
    ){}

    
    /** make talk by talk start */
    async saveTalk(pot_id: number, talk_title: string): Promise<number>{
        const dto:Talk = new Talk()
        const talk_DT = this.fileService.getToday()
        dto.talk_DT = talk_DT
        dto.talk_title = talk_title
        dto.pot_id = pot_id
        await this.talkRepository.save(dto)
        return dto.talk_id
    }
    
    /** find all sentence by talk_id */
    async find(talk_id: number): Promise<TalkDetailDto>{
        const res = await this.talkRepository.createQueryBuilder('talk')
        .select(['talk.talk_id',
        'talk.talk_title',
        'talk.talk_DT',
        'talk.read_FG', 'talk.star_FG',
        'user.user_id', 'user.profile_img_url',
        'pot.pot_id', 'pot.pot_img_url', 'user.nickname'])
        .leftJoin('talk.pot','pot','talk.pot_id = pot.pot_id')
        .leftJoin('pot.user', 'user','pot.user_id = user.user_id')
        .leftJoinAndSelect('talk.sentences','sentence')
        .where('talk.talk_id = :talk_id',{talk_id})
        .getOne()
        .then((v)=> v as unknown as TalkDetailDto)
        await this.talkRepository.update(talk_id, {read_FG: true});

        return res
    }
    
    /** find all talk list by user_id */
    async findByUserId(user_id: number): Promise<TalkListDto[]>{
        const res = await this.talkRepository.createQueryBuilder('talk')
        .select(['talk.talk_id',
        'talk.talk_title',
        'talk.talk_DT',
        'talk.read_FG', 'talk.star_FG',
        'user.user_id', 'user.profile_img_url',
        'pot.pot_id', 'pot.pot_img_url'])
        .leftJoin('talk.pot','pot','talk.pot_id = pot.pot_id')
        .leftJoin('pot.user', 'user','pot.user_id = user.user_id')
        .where('user.user_id = :user_id',{user_id})
        .orWhere('user.parent_id = :user_id',{user_id})
        .getMany()
        .then((v)=> {
            return v.map(o=>o as unknown as TalkListDto)
        })
        return res;
    }

    async findBookmark(user_id: number): Promise<TalkListDto[]>{
        const res = await this.talkRepository.createQueryBuilder('talk')
        .select(['talk.talk_id',
        'talk.talk_title',
        'talk.talk_DT',
        'talk.read_FG', 'talk.star_FG',
        'user.user_id', 'user.profile_img_url',
        'pot.pot_id', 'pot.pot_img_url'])
        .leftJoin('talk.pot','pot','talk.pot_id = pot.pot_id')
        .leftJoin('pot.user', 'user','pot.user_id = user.user_id')
        .where('user.user_id = :user_id or user.parent_id = :user_id',{user_id})
        .andWhere('talk.star_FG = :star_FG',{star_FG:true})
        .getMany()
        .then((v)=> {
            return v.map(o=>o as unknown as TalkListDto)
        })
        return res;
    }
    async bookmark(talk_id: number): Promise<String>{
        if (!talk_id) throw new HttpException('please talk_id',HttpStatus.BAD_REQUEST)
        await this.talkRepository.update(talk_id, {star_FG: () => '!star_FG'})
        return "SUCCESS"
    }

    async findNoRead(user_id: number): Promise<TalkListDto[]>{
        const res = await this.talkRepository.createQueryBuilder('talk')
        .select(['talk.talk_id',
        'talk.talk_title',
        'talk.talk_DT',
        'talk.read_FG', 'talk.star_FG',
        'user.user_id', 'user.profile_img_url',
        'pot.pot_id', 'pot.pot_img_url'])
        .leftJoin('talk.pot','pot','talk.pot_id = pot.pot_id')
        .leftJoin('pot.user', 'user','pot.user_id = user.user_id')
        .where('user.user_id = :user_id or user.parent_id = :user_id',{user_id})
        .andWhere('talk.read_FG = :read_FG',{read_FG:false})
        .getMany()
        .then((v)=> {
            return v.map(o=>o as unknown as TalkListDto)
        })
        return res;
    }
}

// /** save talk from redis to Mysql */
// async updateTalk(talk_id: number): Promise<string>{
//     try {
//         const talkArray = (await this.redisService.get(`${talk_id}:array`)).split(".")
//         for (const sentence of talkArray) {
//             const sentenceJson: SentenceCreateDto= JSON.parse(sentence)
//             const res = await this.sentenceService.save(sentenceJson)
//             if (res=="fail") console.log(`wrong data in talk ${talk_id} : ${talkArray.toString}`)
//         }
//         return "success"
//     } catch (e) {
//         return "fail"
//     }
// }
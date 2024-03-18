import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pot } from './pot.entity';
import { Repository } from 'typeorm';
import { CreatePotDto, PotWithStatusDto, SelectPotDto, StatusDto, UpdatePotDto } from './pot.dto';
import { PotStateService } from 'src/pot-state/pot-state.service';
import { join } from 'path';
import { DeviceService } from 'src/device/device.service';
import { S3Service } from 'src/s3/s3.service';
import { CalenderService } from 'src/calender/calender.service';
import { plainToInstance } from 'class-transformer';
import { SelectCollectionDto } from './pot-res.dto';
import { UserService } from 'src/user/user.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';

@Injectable()
export class PotService {
    constructor(
        @InjectRepository(Pot)
        private readonly potRepository: Repository<Pot>,
        private readonly deviceService: DeviceService,
        @Inject(forwardRef(() => PotStateService))
        private readonly potStateService: PotStateService,    
        private readonly calenderService: CalenderService,    
        private readonly s3Service: S3Service,       
        private readonly userService: UserService,
        @Inject(forwardRef(() => SocketGateway))
        private readonly socketGateway: SocketGateway,
    ){}

    KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    async findAllPot(): Promise<SelectPotDto[]>{
        const result = await this.potRepository.find({
            relations: {user: true}
        });
        return result;
    }
        
    async potWithStatus(parent_id: number): Promise<PotWithStatusDto[]>{
        const now = new Date();
        const pot = await this.potRepository.createQueryBuilder('pot')
        .select(['pot.pot_id', 'pot.pot_name', 'pot.pot_species','pot.planting_day', 
                        'user.parent_id', 'pot.temperature','pot.min_temperature', 'pot.max_temperature',
                        'pot.min_moisture', 'pot.max_moisture',
                        'pot.moisture', 'pot.pot_img_url', 'user.user_id', 'user.nickname',
                        'user.profile_img_url'])    
            .leftJoin('pot.user', 'user', 'user.user_id = pot.user_id')
            .where('(user.user_id= :parent_id and pot.collection_FG= :flag)', {parent_id, flag: false})
            .orWhere('(user.parent_id= :parent_id and pot.collection_FG= :flag)', {parent_id, flag:false})
            .getMany()
            .then(o => plainToInstance(PotWithStatusDto, o));

        const statusDtos = new Array<PotWithStatusDto>();
        for(let i = 0; i < pot.length; i++){
            const statusDto = new StatusDto();
            const element = pot[i];
            const waterAndTalkDto = await this.calenderService.getLastTalkAndWater(element.pot_id);

            const water_calender_id = waterAndTalkDto.water_calender_id;
            const talk_calender_id = waterAndTalkDto.talk_calender_id;
            let lastWaterDay = 0;
            let lastTalkDay = 0;

            if(water_calender_id == null) lastWaterDay = 0;
            else lastWaterDay = Math.floor((now.getTime() + this.KR_TIME_DIFF - waterAndTalkDto.water_createdAt.getTime())/(1000 * 24 * 24 * 60));
    
            if(talk_calender_id == null) lastTalkDay = 0;
            else lastTalkDay = Math.floor((now.getTime() + this.KR_TIME_DIFF - waterAndTalkDto.talk_createdAt.getTime())/(1000 * 24 * 24 * 60));

            const together_day = this.potStateService.theDayWeWereTogether(element.planting_day);
            const moisState = this.potStateService.moisState(element.min_moisture, element.max_moisture, element.moisture);
            const tempState = this.potStateService.tempState(element.min_temperature, element.max_temperature, element.temperature);

            statusDto.lastTalkDay = lastTalkDay;
            statusDto.lastWaterDay = lastWaterDay;
            statusDto.mois_state = moisState;
            statusDto.temp_state = tempState;
            statusDto.together_day = together_day;
            
            element.statusDto = statusDto;
            statusDtos.push(element);
        }
        return statusDtos;
    }

    async potDetail(pot_id: number): Promise<PotWithStatusDto>{
        await this.socketGateway.refresh(pot_id)
        const now = new Date();
        const waterAndTalkDto = await this.calenderService.getLastTalkAndWater(pot_id);
        const water_calender_id = waterAndTalkDto.water_calender_id;
        const talk_calender_id = waterAndTalkDto.talk_calender_id;

        const pot = await this.potRepository.createQueryBuilder('pot')
        .select(['pot.pot_id', 'pot.pot_name', 'pot.pot_species','pot.planting_day', 
                 'user.parent_id', 'pot.temperature','pot.min_temperature', 'pot.max_temperature',
                 'pot.min_moisture', 'pot.max_moisture',
                 'pot.moisture', 'pot.pot_img_url', 'user.user_id', 'user.nickname',
                 'user.profile_img_url'])                         
        .leftJoin('pot.user', 'user', 'user.user_id = pot.user_id')
        .where('pot.pot_id= :pot_id', {pot_id})
        .getOne()
        .then(o => plainToInstance(PotWithStatusDto, o));

        if (!pot) throw new HttpException('check pot_id', HttpStatus.BAD_REQUEST)
        
        const statusDto = new StatusDto();

        let lastWaterDay = 0;
        let lastTalkDay = 0;

        if(water_calender_id == null) lastWaterDay = 0;
        else lastWaterDay = Math.floor((now.getTime() + this.KR_TIME_DIFF - waterAndTalkDto.water_createdAt.getTime())/(1000 * 24 * 24 * 60));

        if(talk_calender_id == null) lastTalkDay = 0;
        else lastTalkDay = Math.floor((now.getTime() + this.KR_TIME_DIFF- waterAndTalkDto.talk_createdAt.getTime())/(1000 * 24 * 24 * 60));

        const together_day = this.potStateService.theDayWeWereTogether(pot.planting_day);
        const moisState = this.potStateService.moisState(pot.min_moisture, pot.max_moisture, pot.moisture);
        const tempState = this.potStateService.tempState(pot.min_temperature, pot.max_temperature, pot.temperature);

        statusDto.lastTalkDay = lastTalkDay;
        statusDto.lastWaterDay = lastWaterDay;
        statusDto.mois_state = moisState;
        statusDto.temp_state = tempState;
        statusDto.together_day = together_day;
        pot.statusDto = statusDto;
        
        return pot;
    }  

    async save(createPotDto: CreatePotDto, file?: Express.Multer.File) {
        const pot: Pot = this.potRepository.create(createPotDto);
        const savePot = await this.potRepository.save(pot);
        await this.calenderService.whenPotSave(savePot.pot_id);
        await this.deviceService.mappingPot(createPotDto.device_id, savePot.pot_id);

        const filePath = join('upload/pot/')
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const fileName = pot.pot_id + '.' + extension
            pot.pot_img_url = await this.s3Service.upload(file, filePath + fileName)
        } catch (e){
            pot.pot_img_url = 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png'
        }
        await this.potRepository.update(pot.pot_id,pot)
    }

    async update(pot_id: number, data: UpdatePotDto, file?: Express.Multer.File){
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const filePath ='upload/pot/'
            const fileName = pot_id + '.' + extension
            data.pot_img_url = await this.s3Service.upload(file, filePath + fileName)
        } catch (e){
            data.pot_img_url = 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png'
        }
        await this.potRepository.update(pot_id, {...data})
    }

    async delete(pot_id: number){
        const pot = await this.potRepository.findOne({where: {pot_id}});
        console.log(pot);
        if(!pot) throw new HttpException('존재하지 않는 화분', HttpStatus.BAD_REQUEST); 
        await this.potRepository.softDelete(pot_id);
    }

    async findPotsByUserId(user_id: number): Promise<Pot[]> {
        return this.potRepository.createQueryBuilder('pot')
          .where('pot.user_id = :user_id', { user_id })
          .andWhere('pot.collection_FG= :FG ', {FG: 0})
          // 첫번째 파라미터는 repository의 엔티티의 연관관계가 잡힌 필드의 이름
          // 두번째 파라미터는 해당 alias
            //   .leftJoinAndSelect('pot.user', 'user')
          .select([
            'pot.pot_id', 'pot.pot_name', 'pot.pot_name',
            'pot.pot_img_url', 'pot.min_temperature', 'pot.max_temperature',
            'pot.min_moisture', 'pot.max_moisture', 'pot.createdAt', 'pot.pot_img_url',
            'pot.temperature', 'pot.moisture'
          ])
          .getMany();
      }

    async find(pot_id:number): Promise<Pot>{
        const [pot] = await this.potRepository.find({relations:{user:true}, where:{pot_id}, take:1})
        return pot
    }
    
    async collectionDetail(pot_id: number): Promise<Pot>{
        const result = await this.potRepository.findOne({
            where: {pot_id: pot_id}
        })
        return result;
    }

    async findCollection(user_id: number): Promise<SelectCollectionDto> {
        return await this.userService.findCollection(user_id);        
    }

    async toCollection(pot_id: number){
        console.log(await this.potRepository.findOne({where: {pot_id, collection_FG: true}}));
        if(await this.potRepository.findOne({where: {pot_id, collection_FG: true}} )) throw new HttpException('이미 컬렉션에 존재하는 식물', HttpStatus.BAD_REQUEST);
        await this.deviceService.collectionDevice(pot_id);
        const [pot] = await this.potRepository.find({where:{pot_id},take:1})
        const now = new Date()
        pot.together_day = Math.ceil((now.getTime() - pot.planting_day.getTime())/(1000 * 60 * 60 * 24))
        pot.collection_FG = true
        await this.potRepository.update(pot_id, pot);
    }

    async increaseHappyCnt(pot_id: number){
        await this.potRepository.update(pot_id, {happy_cnt: () => 'happy_cnt + 1'})
    }

    async calenderWithCurrentMoisAndTemp(pot_id: number): Promise<Pot>{
        return await this.potRepository.findOne({
            where: {pot_id},
            select: {temperature: true, moisture: true}
        })
    }

    async potStateSave(inputDto: CreatePotStateDto){
        if(inputDto.isTemp_FG) await this.potRepository.update(inputDto.pot_id, {temperature: inputDto.data});
        else await this.potRepository.update(inputDto.pot_id, {moisture: inputDto.data});
        
    }
}

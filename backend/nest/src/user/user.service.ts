import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildSaveDto, CreateUserDto, UpdateUserDto } from './user-req.dto';
import { SimpleUserListDto, UserDetailDto, UserListDto } from './user-res.dto';
import { plainToInstance } from 'class-transformer';
import { AllUserDto } from 'src/user-login/user-login.dto';
import { Pot } from 'src/pot/pot.entity';
import { S3Service } from './../s3/s3.service';
import { SelectCollectionDto } from 'src/pot/pot-res.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly s3Service: S3Service
    ){}

    async findByParent(user_id: number):Promise<UserListDto[]>{
        const child = await this.userRepository.find({where: {parent_id:user_id}})
        child.push( await this.userRepository.findOneBy({user_id}) )
        return plainToInstance(UserListDto, child);
    }

    async find(user_id: number): Promise<UserDetailDto>{
        const user = await this.userRepository.createQueryBuilder('user')
            .where('user.user_id= :user_id', {user_id})
            .leftJoinAndSelect('user.pots', 'pot', 'pot.user_id = user.user_id')
            .select(['user', 'pot.pot_id', 'pot.pot_name', 'pot.pot_species', 'pot.pot_img_url', 'pot.collection_FG']) 
            .getOne()
      
        if (!user) throw new HttpException('Check User_Id', HttpStatus.BAD_REQUEST)
      
        user.pots = user.pots.filter(pot => !pot.collection_FG);
        
        return user;
      }
      
    
    async save(data: CreateUserDto, file?: Express.Multer.File): Promise<number>{
        await this.userRepository.save(data);
        const user: User = data as User
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const filePath = 'upload/profile/'
            const fileName = user.user_id + '.' + extension
            user.profile_img_url = await this.s3Service.upload(file, filePath+fileName)
        } catch (e){
            console.log(e)
            user.profile_img_url = 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png'
        }
        await this.userRepository.update(user.user_id,{...user})
        return user.user_id;
    }

    async saveChild(data: ChildSaveDto, file?: Express.Multer.File): Promise<number>{   
        const child = this.userRepository.create(data);
        try{            
            await this.userRepository.save(child)
            try{
                const split = file.originalname.split('.')
                const extension = split[split.length -1]
                const filePath = 'upload/profile/'
                const fileName = child.user_id + '.' + extension
                child.profile_img_url = await this.s3Service.upload(file, filePath+fileName)
            } catch (e){
                child.profile_img_url = 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png'
            }
            await this.userRepository.update(child.user_id,{...child})
            return 1;
        }catch(e){
            throw new HttpException('Bad_REQUEST', HttpStatus.BAD_REQUEST)
        }
    }


    async update(user_id: number, data: UpdateUserDto, file?: Express.Multer.File): Promise<number>{
        const user = await this.userRepository.findOneBy({user_id})
        if (!user) throw new HttpException('Bad_REQUEST', HttpStatus.NOT_FOUND)
        
        try{
            const split = file.originalname.split('.')
            const extension = split[split.length -1]
            const filePath = 'upload/profile/'
            const fileName = user.user_id + '.' + extension
            data.profile_img_url = await this.s3Service.upload(file, filePath+fileName)
        } catch (e){
            data.profile_img_url = 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png'
        }
        try{
            this.userRepository.update(user_id, {...data})
            return 1;
        }catch (e){
            return -1;
        }
    }

    async delete(user_id: number): Promise<void>{
        if(!await this.userRepository.findOne({where: {user_id}})) throw new HttpException('존재하지 않는 유저', HttpStatus.BAD_REQUEST)
        await this.userRepository.delete(user_id);
    }

    async findPot(user_id: number): Promise<User>{
        const user: User = await this.userRepository.createQueryBuilder('user')
            .where('user.user_id= :user_id', {user_id})
            .andWhere('pot.collection_FG= :flag', {flag: false})
            .leftJoinAndSelect('user.pots', 'pot', 'pot.user_id=user.user_id')
            .select([
                'user', 'pot.pot_id', 'pot.pot_name', 'pot.pot_species'
            ])
            .getOne()
        return user;
    }

    async findByUserIdInTalk(user_id: number): Promise<User>{
        return await this.userRepository.findOne({
            relations: {talk: true},
            where: {user_id: user_id},
        })
    }

    // 화분이 없는 유저 목록
    async unMappingUser(user_id: number): Promise<UserListDto[]>{
        const result = await this.userRepository
            .createQueryBuilder('user')
            .where((qb: SelectQueryBuilder<User>) => {
                const subQuery = qb
                .subQuery()
                .select('pot.user_id')
                .from(Pot, 'pot')
                .where('pot.user_id = user.user_id')
                .getQuery();
                return `user.user_id NOT IN ${subQuery}`;
            })
            .andWhere('user.user_id= :user_id', {user_id})
            .select(['user.user_id', 'user.nickname'])
            .getMany();
        return result;
    }

    async findUserWithInfo(): Promise<AllUserDto[]>{
        const result = await this.userRepository.find({
            relations: {userLogin: true}
        });
        return result;
    }

    async findAllUser(): Promise<User[]>{
        return await this.userRepository.find({
            relations: {pots: true}
        })
    }

    async findCollection(user_id: number): Promise<SelectCollectionDto> {
        const collection: SelectCollectionDto = 
            await this.userRepository.createQueryBuilder('user')
                .select(['user.profile_img_url', 'user.user_id', 'user.nickname',
                        'pot.pot_id', 'pot.pot_name', 'pot.pot_species', 'pot.pot_img_url', 
                        'pot.planting_day', 'pot.happy_cnt', 'pot.together_day'])
                .leftJoinAndSelect('user.pots', 'pot', 'user.user_id = pot.user_id')
                .where({user_id})
                .andWhere('pot.collection_FG= :flag', {flag: true})
                .getOne()
                .then(o => o as unknown as SelectCollectionDto)
        return collection; 
    }

}
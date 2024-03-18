import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './species.entity';
import { Repository } from 'typeorm';
import { SpeciesListDto } from './species-res.dto';

@Injectable()
export class SpeciesService {
    constructor(@InjectRepository(Species) private readonly speciesRepository: Repository<Species>){}
    
    async speciesFind(): Promise<SpeciesListDto[]>{
        return await this.speciesRepository.find();
    }
}

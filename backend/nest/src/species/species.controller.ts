import { Controller, Get } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SpeciesListDto } from './species-res.dto';

@Controller('species')
@ApiTags('Species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService){}

    @Get()
    @ApiOperation({summary: '자동완성할 식물 종 목록'})
    @ApiOkResponse({type:SpeciesListDto, description:'저장된 식물들의 상세내용'})
    async findSpecies(): Promise<SpeciesListDto[]>{
        return await this.speciesService.speciesFind();
    }

}

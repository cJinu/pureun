import { Controller, Get, Param } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { Calender } from './calender.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SelectCalenderDto, SimpleCalenderDto } from './calender.dto';
import { plainToInstance } from 'class-transformer';

@Controller('calender')
@ApiTags('Calender')
export class CalenderController {
    constructor(private readonly calenderService: CalenderService){}

    @Get(':pot_id')
    @ApiOperation({summary: '화분의 캘린더 조회'})
    @ApiOkResponse({type:SimpleCalenderDto})
    async findAll(@Param('pot_id') pot_id: number): Promise<SimpleCalenderDto[]>{
        return await this.calenderService.findCalenderByPotId(pot_id);
    }

    @Get()
    @ApiOperation({summary: '모든 캘린더 조회'})
    @ApiOkResponse({type:SimpleCalenderDto})
    async findAllCalender(): Promise<SimpleCalenderDto[]>{
        return await this.calenderService.findAllCalender();
    }
}

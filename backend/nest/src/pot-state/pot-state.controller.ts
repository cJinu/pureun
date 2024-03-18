import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PotStateService } from './pot-state.service';
import { MoisAndTemp } from './pot-state.dto';

@Controller('pot-state')
@ApiTags('Pot-state')
export class PotStateController {
    constructor(private readonly potStateService: PotStateService){};
    
    @Get('yesterday/:pot_id')
    @ApiOperation({summary: '화분의 전날 온습도 리스트'})
    @ApiOkResponse({type: MoisAndTemp})
    async getYesterday(@Param('pot_id') pot_id: number): Promise<MoisAndTemp>{
        return await this.potStateService.yesterdayMoisAndTemp(pot_id);
    }

    @Get('today/:pot_id')
    @ApiOperation({summary: '화분의 오늘 온습도 리스트'})
    @ApiOkResponse({type: MoisAndTemp})
    async getToday(@Param('pot_id') pot_id: number): Promise<MoisAndTemp>{
        return await this.potStateService.todayMoisAndTemp(pot_id);
    }
    
}

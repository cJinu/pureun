import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PotInitDeviceDto, SelectDeviceDto, UserInitDeviceDto } from './device-req.dto';

@Controller('device')
@ApiTags('Device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService){}

    @Get('unMapping/:user_id')
    @ApiOperation({summary: '비어있는 디바이스 출력', description: '화분 등록시 등록 가능한 디바이스 출력'})
    async unMappingDevice(@Param('user_id') user_id: number): Promise<SelectDeviceDto[]>{
        return await this.deviceService.unMappingDevice(user_id);
    }

    @Get('Mapping/:user_id')
    @ApiOperation({summary: '비어있지 않은 디바이스 출력'})
    async mappingDevice(@Param('user_id') user_id: number): Promise<SelectDeviceDto[]>{
        return await this.deviceService.mappingDevice(user_id);
    }

    @Put('user')
    @ApiOperation({summary: '디바이스의 주인과 이름을 지정'})
    @ApiBody({type: UserInitDeviceDto})
    @ApiOkResponse({ type:String, description:'SUCCESS or FAIL'})
    async updateUserDevice(@Body() userInitDeviceDto: UserInitDeviceDto): Promise<string>{
        await this.deviceService.mappingUserDevice(userInitDeviceDto);
        return 'SUCCESS';
    }

    @Get('check/:serial_number')
    @ApiOperation({summary: '시리얼 넘버가 DB에 있는지 확인'})
    @ApiOkResponse({type: Boolean, description: 'true면 적절한 시리얼번호, 적절하지 않으면 false'})
    async checkDevice(@Param('serial_number') serial_number: string,): Promise<Boolean>{
        return await this.deviceService.checkDevice(serial_number);
    }

    @Delete(':device_id')
    @ApiOperation({summary: '디바이스 삭제'})
    @ApiOkResponse({type: String, description: 'SUCCESS or FAIL'})
    async deleteDevice(@Param('device_id') device_id: number): Promise<String>{
        await this.deviceService.deleteDevice(device_id);
        return 'SUCCESS';
    }
}

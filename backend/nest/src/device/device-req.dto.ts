import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsString, IsOptional, IsNumber } from 'class-validator';

@Exclude()
export class DeviceCreateDto{
    @IsString()
    @Type(()=> String)
    serial_number: string;

    @Type( () => Boolean )
    empty_FG?: boolean=false;

    @Type( () => Number )
    @IsOptional()
    user_id?: number=null;

    @Type( () => Number )
    @IsOptional()
    pot_id?: number=null;

    @IsOptional()
    client_id?: string=null;
}


export class DeviceUpdateDto{
    @IsString()
    @Type(()=> String)
    serial_number: string;

    @Type( () => Boolean )
    empty_FG?: boolean=false;

    @IsOptional()
    client_id?: string=null;
}

@Exclude()
export class SelectDeviceDto{

    @IsNumber()
    @Type(() => Number)
    pot_id: number;

    @IsString()
    @Type( () => String )
    serial_number: string;

    @IsString()
    @Type(() => String)
    device_name: string;
}

export class UserInitDeviceDto{
    @IsString()
    @ApiProperty({example: '100000005b74c132'})
    serial_number: string;

    @IsString()
    @ApiProperty({example: '진짜 디바이스'})
    device_name: string;

    @IsNumber()
    @ApiProperty({example: 1})
    @Type(() => Number)
    user_id: number;
}

export class PotInitDeviceDto{
    @ApiProperty({example: 1})
    @IsNumber()
    @Type(() => Number)
    device_id: number;

    @ApiProperty({example: 1})
    @IsNumber()
    @Type(() => Number)
    pot_id: number;
}
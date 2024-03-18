import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString, Length, IsNumber } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";
import { User } from "src/user/user.entity";


export class PotUserDto{
    @IsInt()
    @ApiProperty({example: 3})
    @Type(()=>Number)
    user_id: number;

    @IsString()
    @Length(1, 10)
    @ApiProperty({example: '이서호'})
    nickname: string;
}

export class CreatePotDto {
    @IsNumber()
    @ApiProperty({example: 1})
    @Type(() => Number)
    device_id: number;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '푸른', required: true})
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty({example: '소나무', required: true})
    pot_species: string;
    
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    max_moisture: number;

    @IsString()
    @IsOptional()
    pot_img_url: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example: 10.5, description: '현재 화분의 온도'})
    @Type(()=>Number)
    temperature: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({example: 10.5, description: '현재 화분의 습도'})
    @Type(()=>Number)
    moisture: number;

    @IsOptional()
    @IsDate()
    @ApiProperty({example: '2023-02-13', description: '심은 날'})
    @Type(() => Date)
    planting_day: Date;
}

export class UpdatePotDto{
    @IsString()
    @IsOptional()
    @ApiProperty({example: '금쪽이',required: true})
    pot_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({example: '바질'})
    pot_species: string;
    
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    @Type(()=>Number)
    max_moisture: number;

    @IsString()
    @IsOptional()
    pot_img_url: string;
}

@Exclude()
export class SelectPotDto{
    @IsNumber()
    @Expose()
    @Type(()=>Number)
    pot_id: number;

    @IsString()
    @ApiProperty()
    @Length(1, 10)
    @Expose()
    pot_name: string;

    @IsString()
    @ApiProperty()
    @Length(1, 10)
    @Expose()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Expose()
    @Type(()=>Date)
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Expose()
    @Type(()=>Date)
    updatedAt ? : Date
    
    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    min_temperature?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    @Type(()=>Number)
    max_temperature: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    @Type(()=>Number)
    min_moisture: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Expose()
    @Type(()=>Number)
    max_moisture: number;

    @IsString()
    @IsOptional()
    @Length(1, 200)
    @ApiProperty()
    @Expose()
    pot_img_url: string;

    @IsNumber()
    @ApiProperty()
    @Expose()
    user: User;

    // user_id가 0 이라면 이 화분은 부모가 키우고 있다는 것!
    // user_id가 존재한다면 아이가 키우고 있다는 것
    // @IsInt()
    // @IsOptional()
    // @ApiProperty()
    // user_id ? : number = 0;    
}

export class CollectionDto{
    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_name: string;

    @IsString()
    @Length(1,10)
    @ApiProperty()
    pot_species: string;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Type(()=>Date)
    createdAt ? : Date

    @IsDate()
    @IsOptional()
    @ApiProperty()
    @Type(()=>Date)
    deletedAt ? : Date

    @IsString()
    @Length(1, 200)
    @ApiProperty()
    pot_img_url: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    @Type(()=>Number)
    happy_cnt ? : number;
}

export class StatusDto{
    @ApiProperty()
    @IsNumber()
    lastWaterDay: number;

    @ApiProperty()
    @IsNumber()
    lastTalkDay: number;

    @ApiProperty()
    @IsString()
    temp_state: string;

    @ApiProperty()
    @IsString()
    mois_state: string;

    @ApiProperty()
    @IsNumber()
    @Type(()=>Number)
    together_day: number;
}

export class PotWithStatusDto{
    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    pot_id: number;

    @IsString()
    @ApiProperty()
    pot_name: string;

    @IsString()
    @ApiProperty()
    pot_img_url: string;

    @IsString()
    @ApiProperty()
    pot_species: string;

    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    parent_id: number;

    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    user_id: number;

    @IsString()
    @ApiProperty()
    profile_img_url: string;

    @IsString()
    @ApiProperty()
    nickname: string;

    @IsNumber()
    @Type(()=>Number)
    temperature: number;

    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    moisture: number;

    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    last_water: number;

    @IsString()
    @Type(()=>Date)
    @ApiProperty()
    planting_day: Date;

    @IsNumber()
    @Type(()=>Number)
    @ApiProperty()
    last_talk: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    min_moisture: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    max_moisture: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    min_temperature: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    max_temperature: number;

    @Type(() => StatusDto)
    @ApiProperty()
    statusDto: StatusDto;
}





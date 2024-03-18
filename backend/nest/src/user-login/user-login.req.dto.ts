import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, Length, IsDate, IsNumber, IsOptional } from 'class-validator';

export class LoginUserDto{ 
    @ApiProperty({example:'박지예', description: '유저의 별칭'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'F', description:'M for male'})
    gender: string;

    @IsString()
    @IsOptional()
    profile_img_url?: string=null;

    @ApiProperty({example: '실제 이름'})
    @Type(()=>String)
    @IsString()
    @Length(1, 10)
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @Type(()=>String)
    @IsString()
    @Length(1, 30)
    user_email: string;

    @ApiProperty({example: '1234'})
    @Type(()=>String)
    @IsString()
    @Length(1, 30)
    user_password: string;

    @Type(()=>Number)
    user_id?: number
}

export class LoginSaveDto{
    @ApiProperty({example: '실제 이름'})
    @Type(()=>String)
    @IsString()
    @Length(1, 10)
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @Type(()=>String)
    @IsString()
    @Length(1, 30)
    user_email: string;

    @ApiProperty({example: '1234'})
    @Type(()=>String)
    @IsString()
    @Length(1, 30)
    user_password: string;

    @Type(()=>Number)
    user_id?: number
}
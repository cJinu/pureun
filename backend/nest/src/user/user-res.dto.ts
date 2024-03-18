import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString, } from 'class-validator';
import { Species } from "src/species/species.entity";

export class UserListDto{
    @ApiProperty({example: 1})
    @Expose()
    user_id: number;

    @ApiProperty({example: '룰루랄라'})
    @Expose()
    nickname: string;

    @ApiProperty({example: 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png'})
    @Expose()
    profile_img_url?: string="https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png";
}

export class UserDetailDto{
    @ApiProperty({example: 1})
    @Expose()
    user_id: number;

    @ApiProperty({example: '김푸른'})
    @Expose()
    nickname: string;

    @ApiProperty({example:'1990-01-01'})
    birth_DT: Date;

    @ApiProperty({example: 'M'})
    gender: string;

    @ApiProperty({example: 'https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png'})
    @Expose()
    profile_img_url?: string="";
}

@Exclude()
export class SpeciesWithUser{
    @Expose()
    @IsNumber()
    user_id: number;

    @Expose()
    @IsString()
    nickname: string;

    @Type(() => Species)
    @Expose()
    species: Species[];
}


export class SimpleUserListDto{
    @IsNumber()
    pot_id: number;

    @IsString()
    pot_name: string;

    @IsNumber()
    user_id: number;

    @IsString()
    profile_img_url: string;

    @IsString()
    nickname: string;

    @IsString()
    pot_img_url: string;

    @IsNumber()
    parent_id: number;
}
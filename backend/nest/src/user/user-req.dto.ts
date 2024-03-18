import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class CreateUserDto{
    @ApiProperty({example:'박지예', description: '유저의 별칭'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'F', description:'M for male'})
    gender: string;

    @ApiProperty({example:1, description:'0 if user is parent'})
    @Type(()=>Number)
    parent_id?: number=null;

    @IsString()
    @IsOptional()
    profile_img_url?: string=null;
}

export class UpdateUserDto{
    @ApiProperty({example:'박지예'})
    @IsString()
    @Type(()=>String)
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'M', description:'F for female'})
    @IsString()
    @Type(()=>String)
    gender: string;

    profile_img_url?: string="";
}

export class UserWithUserLoginDto extends CreateUserDto{
    @ApiProperty({example: '실제 이름'})
    @IsString()
    @Length(1, 10)
    @Expose()
    @IsOptional()
    user_name: string;

    @ApiProperty({example: 'email@purun.com'})
    @IsString()
    @Length(1, 30)
    @Expose()
    @IsOptional()
    user_email: string;

    @ApiProperty({example: 1234})
    @IsString()
    @Length(1, 30)
    @Expose()
    @IsOptional()
    user_password: string;
}

export class ChildSaveDto{
    @ApiProperty({example:'박지예', description: '유저의 별칭'})
    @IsString()
    nickname: string;

    @ApiProperty({example:'1997-02-04'})
    @IsDate()
    @Type(() => Date)
    birth_DT: Date;

    @ApiProperty({example:'F', description:'M for male'})
    gender: string;

    @ApiProperty({example:1, description:'if user is parent'})
    @IsNumber()
    @Type(()=>Number)
    parent_id: number;

    @IsString()
    @IsOptional()
    profile_img_url?: string="";
}
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { UserListDto } from "src/user/user-res.dto";

export class CollectionPotDto{
    @Expose()
    @ApiProperty()
    pot_id: number;

    @Expose()
    @ApiProperty()
    pot_name: string;

    @Expose()
    @ApiProperty()
    pot_species: string;
    
    @Expose()
    @ApiProperty()
    pot_img_url: string;
    
    @Expose()
    @ApiProperty()
    planting_day: Date;

    @Expose()
    @ApiProperty()
    deletedAt: Date;
    
    @Expose()
    @ApiProperty()
    happy_cnt: number;

    @Expose()
    @ApiProperty()
    together_day: number;
}

export class SelectCollectionDto extends UserListDto {
    @Expose()
    @Type(() => CollectionPotDto)
    @ApiProperty()
    pots: CollectionPotDto[]
}
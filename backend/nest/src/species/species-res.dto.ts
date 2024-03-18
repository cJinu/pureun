import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

/** 등록된 species 전체 조회용 dto */
@Exclude()
export class SpeciesListDto{
    @ApiProperty({example:1})
    @Expose()
    species_id: number;
    
    @ApiProperty({example:"방울토마토"})
    @Expose()
    species_name: string;
    
    @ApiProperty({example:18})
    @Expose()
    min_temperature: number
    
    @ApiProperty({example:24})
    @Expose()
    max_temperature: number
    
    @ApiProperty({example:60})
    @Expose()
    min_moisture: number
    
    @ApiProperty({example:80})
    @Expose()
    max_moisture: number
}
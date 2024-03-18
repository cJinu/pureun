import { Exclude, Expose } from "class-transformer";

@Exclude()
export class calenderPotDto{
    @Expose()
    pot_id: number;
    @Expose()
    pot_name: string;
}

@Exclude()
export class SelectCalenderDto{
    @Expose()
    calender_id: number;

    @Expose()
    code: string;

    @Expose()
    pot: calenderPotDto;
}

@Exclude()
export class SimpleCalenderDto{
    @Expose()
    code: string;

    @Expose()
    createdAt: Date;
}

export class WaterAndTalkDto{
    water: string;
    water_calender_id: number;
    water_createdAt: Date;
    talk: string;
    talk_calender_id: number;
    talk_createdAt: Date;
}
import { Exclude, Type } from "class-transformer";

@Exclude()
export class CalenderCreateDto{
    code: string;

    @Type(() => Number)
    pot_id: number;
}
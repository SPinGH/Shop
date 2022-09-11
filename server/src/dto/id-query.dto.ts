import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParam {
    @Type(() => Number)
    @IsNumber({}, { message: 'Id должно быть числом' })
    id: number;
}

import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfitRequest {
    @ApiProperty({ example: 'кресло', required: false, description: 'Месяц в формате YYYY-MM' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly month?: string;
}

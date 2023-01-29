import { ApiProperty } from '@nestjs/swagger';

export class ProfitDto {
    @ApiProperty({ example: '2022-11-02 | 2022-01', description: 'Период' })
    readonly period: string;

    @ApiProperty({ example: 12, description: 'Прибыль за период' })
    readonly profit: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class ProfitDto {
    @ApiProperty({ example: '2022-11-02', description: 'День' })
    readonly day: string;

    @ApiProperty({ example: 12, description: 'Прибыль за день' })
    readonly profit: number;
}

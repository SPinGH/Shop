import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfitRequest {
    @ApiProperty({ example: '2022-12', required: false, description: 'Месяц' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly month?: string;

    @ApiProperty({ example: '2022', required: false, description: 'Год' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly year?: string;
}

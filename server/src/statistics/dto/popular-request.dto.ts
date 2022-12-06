import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PopularRequest {
    @ApiProperty({ example: 1, required: false, description: 'Категория' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly categoryId?: number;
}

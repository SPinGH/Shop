import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchRequest {
    @ApiProperty({ example: 1, required: false, description: 'Поиск по категории' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly categoryId?: number;

    @ApiProperty({ example: 'кресло', required: false, description: 'Поиск по названию' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly query?: string;

    @ApiProperty({ example: 10, required: false, description: 'Предел товаров' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly limit?: number;

    @ApiProperty({ example: 1, required: false, description: 'Страница' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly page?: number;
}

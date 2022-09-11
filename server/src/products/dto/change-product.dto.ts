import { IsFile, HasMimeType, MemoryStoredFile } from 'nestjs-form-data';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeProductDto {
    @ApiProperty({ example: 'Красное кресло', description: 'Название товара' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;

    @ApiProperty({ example: 'Кресло для гостиной', required: false, description: 'Описание товара' })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? null : value))
    @IsString({ message: 'Должно быть строкой' })
    readonly description: string | null;

    @ApiProperty({ example: 'Название.jpg', description: 'Картинка' })
    @IsOptional()
    @IsFile({ message: 'Должно быть файлом' })
    @HasMimeType(['image/png', 'image/jpg'], { message: 'Должно быть картинкой' })
    readonly img: MemoryStoredFile;

    @ApiProperty({ example: 100, description: 'Цена товара' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly price: number;

    @ApiProperty({ example: 90, required: false, description: 'Скидка на товар' })
    @IsOptional()
    @Transform(({ value }) => (value === '' ? null : Number(value)))
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly discounted: number | null;

    @ApiProperty({ example: 1, description: 'Категория товара' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly categoryId: number;
}

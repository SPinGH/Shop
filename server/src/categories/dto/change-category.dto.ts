import { IsFile, HasMimeType, MemoryStoredFile } from 'nestjs-form-data';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeCategoryDto {
    @ApiProperty({ example: 'Офис', description: 'Название категории' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly name?: string;

    @ApiProperty({ example: 'файл', description: 'Картинка', format: 'binary' })
    @IsOptional()
    @IsFile({ message: 'Должно быть файлом' })
    @HasMimeType('image/svg+xml', { message: 'Должно быть в svg формате' })
    readonly img?: MemoryStoredFile;
}

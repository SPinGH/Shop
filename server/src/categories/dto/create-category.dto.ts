import { IsFile, HasMimeType, MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Офис', description: 'Название категории' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;

    @ApiProperty({ example: 'файл', description: 'Картинка', format: 'binary' })
    @IsFile({ message: 'Должно быть файлом' })
    @HasMimeType('image/svg+xml', { message: 'Должно быть в svg формате' })
    readonly img: MemoryStoredFile;
}

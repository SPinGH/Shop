import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories.model';

export class CategoryDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: 'Офис', description: 'Название категории' })
    readonly name: string;

    @ApiProperty({ example: 'Название.jpg', description: 'Название файла с картинкой' })
    readonly img: string;

    constructor(category: Category) {
        this.id = category.id;
        this.name = category.name;
        this.img = category.img;
    }
}

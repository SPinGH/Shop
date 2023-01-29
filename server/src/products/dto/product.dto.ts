import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from 'src/categories/dto/category.dto';
import { Product } from '../products.model';

export class ProductDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: 'Красное кресло', description: 'Название товара' })
    readonly name: string;

    @ApiProperty({ example: 'Кресло для гостиной', description: 'Описание товара' })
    readonly description: string | null;

    @ApiProperty({ example: 'Название.jpg', description: 'Название файла с картинкой' })
    readonly img: string;

    @ApiProperty({ example: 100, description: 'Цена товара' })
    readonly price: number;

    @ApiProperty({ example: 90, description: 'Скидка на товар' })
    readonly discounted: number | null;

    @ApiProperty({ example: 1, description: 'Id категории товара' })
    readonly categoryId: number;

    @ApiProperty({ required: false, description: 'Категория товара' })
    readonly category?: CategoryDto;

    @ApiProperty({ example: 12, required: false, description: 'Количество лайков' })
    readonly likes?: number;

    constructor(product: Product, likes?: number) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.img = product.img;
        this.price = product.price;
        this.discounted = product.discounted;
        this.categoryId = product.categoryId;
        if (product.category) {
            this.category = new CategoryDto(product.category);
        }
        if (likes !== undefined) {
            this.likes = likes;
        }
    }
}

import { ApiProperty } from '@nestjs/swagger';

import { ProductDto } from 'src/products/dto/product.dto';
import { OrderItem } from '../orderItem.model';

export class OrderItemDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: 1, description: 'Цена' })
    readonly price: number;

    @ApiProperty({ example: 1, description: 'Количество' })
    readonly quantity: number;

    @ApiProperty({ description: 'Товар' })
    readonly product: ProductDto;

    constructor(orderItem: OrderItem) {
        this.id = orderItem.id;
        this.price = orderItem.price;
        this.quantity = orderItem.quantity;
        if (orderItem.product) {
            this.product = new ProductDto(orderItem.product);
        }
    }
}

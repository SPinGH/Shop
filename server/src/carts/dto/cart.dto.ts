import { ProductDto } from 'src/products/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '../carts.model';

export class CartDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ description: 'Товар' })
    readonly product: ProductDto;

    @ApiProperty({ example: 1, description: 'Количество' })
    readonly quantity: number;

    constructor(cart: Cart) {
        this.id = cart.id;
        this.product = new ProductDto(cart.product);
        this.quantity = cart.quantity;
    }
}

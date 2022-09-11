import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class SearchResponse {
    @ApiProperty({ description: 'Товары' })
    readonly rows: ProductDto[];

    @ApiProperty({ example: 12, description: 'Общее количество товаров' })
    readonly count: number;
}

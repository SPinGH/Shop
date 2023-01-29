import { ApiProperty } from '@nestjs/swagger';

export class TotalDto {
    @ApiProperty({ example: 1, description: 'Количество товаров' })
    readonly products: number;

    @ApiProperty({ example: 1, description: 'Количество категорий' })
    readonly categories: number;

    @ApiProperty({ example: 1, description: 'Количество товаров' })
    readonly orders: number;

    @ApiProperty({ example: 1, description: 'Количество пользователей' })
    readonly users: number;

    @ApiProperty({ example: 1, description: 'Количество прибыли' })
    readonly profit: number;
}

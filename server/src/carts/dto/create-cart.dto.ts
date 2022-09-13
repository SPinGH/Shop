import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateCartDto {
    @ApiProperty({ example: 1, description: 'Продукт' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly productId: number;

    @ApiProperty({ example: 1, description: 'Количество' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly quantity: number;
}

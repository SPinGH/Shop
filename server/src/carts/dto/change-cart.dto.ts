import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeCartDto {
    @ApiProperty({ example: 1, description: 'Количество' })
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly quantity: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLikeDto {
    @ApiProperty({ example: 1, description: 'Товар' })
    @Type(() => Number)
    @IsNumber({}, { message: 'Должно быть числом' })
    readonly productId: number;
}

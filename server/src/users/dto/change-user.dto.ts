import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: 'ул. Пушкина д.3 кв. 29', description: 'Адрес' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    readonly address: string;
}

import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;
}

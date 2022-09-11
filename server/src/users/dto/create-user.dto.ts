import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный email' })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Пароль' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(6, 16, { message: 'Не меньше 4 и не более 16' })
    readonly password: string;
}

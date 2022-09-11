import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users.model';

export class UserDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    readonly email: string;

    @ApiProperty({ example: 'User', description: 'Роль' })
    readonly role: 'ADMIN' | 'USER';

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.role = user.role;
    }
}

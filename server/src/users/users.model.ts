import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Like } from 'src/likes/likes.model';
import { Cart } from 'src/carts/carts.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '123456', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'User', description: 'Роль' })
    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'USER' })
    role: 'ADMIN' | 'USER';

    @HasMany(() => Like)
    likes: Like[];

    @HasMany(() => Cart)
    carts: Cart[];
}

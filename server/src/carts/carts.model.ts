import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';

interface CartCreationAttrs {
    userId: number;
    productId: number;
    quantity: number;
}

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart, CartCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Пользователь' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ApiProperty({ example: 1, description: 'Товар' })
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @ApiProperty({ example: 1, description: 'Количество' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Product)
    product: Product;
}

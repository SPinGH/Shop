import { Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { OrderItem } from './orderItem.model';
import { User } from 'src/users/users.model';

interface OrderCreationAttrs {
    userId: number;
    date: Date;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Пользователь' })
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ApiProperty({ example: 1, description: 'Дата' })
    @Column({ type: DataType.DATE, allowNull: false })
    date: Date;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}

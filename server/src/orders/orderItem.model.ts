import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'src/products/products.model';
import { Order } from './order.model';

interface OrderCreationAttrs {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
}

@Table({ tableName: 'orderItems' })
export class OrderItem extends Model<OrderItem, OrderCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 1, description: 'Заказ' })
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId: number;

    @ApiProperty({ example: 1, description: 'Товар' })
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @ApiProperty({ example: 1, description: 'Количество' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;

    @ApiProperty({ example: 1, description: 'Цена' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @BelongsTo(() => Order)
    order: Order;

    @BelongsTo(() => Product)
    product: Product;
}

import { ApiProperty } from '@nestjs/swagger';

import { OrderItemDto } from './order-item.dto';
import { Order } from '../order.model';

export class OrderDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: '2022-09-17T20:27:05.231Z', description: 'Дата заказа' })
    readonly date: Date;

    @ApiProperty({ type: [OrderItemDto], description: 'Части заказа' })
    readonly orderItems: OrderItemDto[];

    constructor(order: Order) {
        this.id = order.id;
        this.date = order.date;
        if (order.orderItems) {
            this.orderItems = order.orderItems.map((orderItem) => new OrderItemDto(orderItem));
        }
    }
}

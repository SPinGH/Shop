import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from 'src/users/dto/user.dto';
import { OrderItemDto } from './order-item.dto';
import { Order } from '../order.model';

export class UserOrderDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    @ApiProperty({ example: '2022-09-17T20:27:05.231Z', description: 'Дата заказа' })
    readonly date: Date;

    @ApiProperty({ type: UserDto, description: 'Пользователь' })
    readonly user: UserDto;

    @ApiProperty({ type: [OrderItemDto], description: 'Части заказа' })
    readonly orderItems: OrderItemDto[];

    constructor(order: Order) {
        this.id = order.id;
        this.date = order.date;
        if (order.orderItems) {
            this.orderItems = order.orderItems.map((orderItem) => new OrderItemDto(orderItem));
        }
        if (order.user) {
            this.user = new UserDto(order.user);
        }
    }
}

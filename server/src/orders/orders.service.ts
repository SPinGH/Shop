import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { Product } from 'src/products/products.model';
import { OrderItem } from './orderItem.model';
import { Cart } from 'src/carts/carts.model';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
        @InjectModel(Cart) private cartRepository: typeof Cart
    ) {}

    async getAll(userId: number) {
        const orders = await this.orderRepository.findAll({
            where: { userId },
            include: { model: OrderItem, include: [Product] },
        });

        return orders.map((order) => new OrderDto(order));
    }

    async create(userId: number) {
        const carts = await this.cartRepository.findAll({ where: { userId }, include: Product });

        if (carts.length === 0) {
            throw new HttpException('Корзина пуста', HttpStatus.BAD_REQUEST);
        }

        const order = await this.orderRepository.create({ userId, date: new Date() });

        for (const cart of carts) {
            const { quantity, product } = cart;
            await this.orderItemRepository.create({
                quantity,
                productId: product.id,
                orderId: order.id,
                price: product.discounted ?? product.price,
            });
            cart.destroy();
        }

        return new CreatedObjectDto(order);
    }
}

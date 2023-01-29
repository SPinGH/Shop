import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';

import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { SearchResponse } from './dto/search-response.dto';
import { SearchRequest } from './dto/search-request.dto';
import { Product } from 'src/products/products.model';
import { UserOrderDto } from './dto/user-order.dto';
import { OrderItem } from './orderItem.model';
import { Cart } from 'src/carts/carts.model';
import { User } from 'src/users/users.model';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.model';
import { Op } from 'sequelize';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
        @InjectModel(Cart) private cartRepository: typeof Cart
    ) {}

    async get(userId: number) {
        const orders = await this.orderRepository.findAll({
            where: { userId },
            include: { model: OrderItem, include: [Product] },
            order: [['date', 'DESC']],
        });

        return orders.map((order) => new OrderDto(order));
    }

    async getAll(param: SearchRequest) {
        const { email, limit = 5, page = 1 } = param;
        const offset = page * limit - limit;

        const userWhere: WhereOptions<User> = {};
        if (email !== undefined) {
            userWhere.email = { [Op.like]: `%${email.toLowerCase()}%` };
        }

        const response = await this.orderRepository.findAndCountAll({
            limit,
            offset,
            include: [
                { model: OrderItem, include: [Product] },
                { model: User, where: userWhere },
            ],
            distinct: true,
        });

        return {
            rows: response.rows.map((order) => new UserOrderDto(order)),
            count: response.count,
        } as SearchResponse;
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
                price: product.discounted
                    ? Math.ceil((product.price / 100) * (100 - (product.discounted ?? 0)))
                    : product.price,
            });
            cart.destroy();
        }

        return new CreatedObjectDto(order);
    }

    async delete(id: number) {
        const product = await this.orderRepository.findOne({ where: { id } });

        if (!product) {
            throw new HttpException('Заказ с таким id не найден', HttpStatus.NOT_FOUND);
        }

        await product.destroy();
        return null;
    }
}

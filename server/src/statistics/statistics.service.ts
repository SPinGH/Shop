import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { Category } from 'src/categories/categories.model';
import { PopularRequest } from './dto/popular-request.dto';
import { ProductDto } from 'src/products/dto/product.dto';
import { ProfitRequest } from './dto/profit-request.dto';
import { OrderItem } from 'src/orders/orderItem.model';
import { Product } from 'src/products/products.model';
import { literal, WhereOptions } from 'sequelize';
import { Order } from 'src/orders/order.model';
import { User } from 'src/users/users.model';
import { TotalDto } from './dto/total.dto';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderItem) private orderItemRepository: typeof OrderItem,
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Category) private categoryRepository: typeof Category,
        @InjectModel(User) private userRepository: typeof User
    ) {}

    async getTotal() {
        const total: TotalDto = {
            products: await this.productRepository.count(),
            orders: await this.orderRepository.count(),
            categories: await this.categoryRepository.count(),
            users: await this.userRepository.count(),
            profit: (
                (await this.orderItemRepository.findOne({
                    raw: true,
                    attributes: [[literal('SUM(price*quantity)::int'), 'total']],
                })) as any
            ).total,
        };

        return total;
    }

    async getPopular(param: PopularRequest) {
        const { categoryId } = param;
        const where: WhereOptions<Product> = {};

        if (categoryId !== undefined) {
            where.categoryId = categoryId;
        }

        const products = await this.productRepository.findAll({
            raw: true,
            attributes: [
                '*',
                [literal('(SELECT COUNT(*)::int FROM Likes WHERE Likes."productId" = "Product".id)'), '"likesCount"'],
            ],
            where,
            order: [[literal('"likesCount"'), 'DESC']],
            limit: 5,
        });

        return products.map((product) => new ProductDto(product, (product as any).likesCount));
    }

    async getProfit(param: ProfitRequest) {
        const today = new Date();
        const { month = `${today.getFullYear()}-${today.getMonth() + 1}` } = param;

        return await this.orderRepository.findAll({
            raw: true,
            attributes: [
                [literal("to_char(date, 'YYYY-MM-DD')"), 'day'],
                [literal('sum(price*quantity)::int'), 'profit'],
            ],
            include: { model: OrderItem, attributes: [] },
            where: literal(`date >= '${month}-01'::date and date < ('${month}-01'::date + '1 month'::interval)`),
            group: 'day',
        });
    }
}

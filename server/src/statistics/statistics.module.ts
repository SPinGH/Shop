import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { StatisticsController } from './statistics.controller';
import { Category } from 'src/categories/categories.model';
import { StatisticsService } from './statistics.service';
import { OrderItem } from 'src/orders/orderItem.model';
import { Product } from 'src/products/products.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/orders/order.model';
import { User } from 'src/users/users.model';

@Module({
    controllers: [StatisticsController],
    providers: [StatisticsService],
    imports: [SequelizeModule.forFeature([Order, OrderItem, User, Product, Category]), AuthModule, UsersModule],
})
export class StatisticsModule {}

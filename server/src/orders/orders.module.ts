import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { OrdersController } from './orders.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { OrdersService } from './orders.service';
import { OrderItem } from './orderItem.model';
import { Cart } from 'src/carts/carts.model';
import { Order } from './order.model';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [SequelizeModule.forFeature([Order, OrderItem, Cart]), AuthModule, UsersModule],
})
export class OrdersModule {}

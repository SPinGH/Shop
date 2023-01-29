import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as path from 'path';

import { CategoriesModule } from './categories/categories.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ProductsModule } from './products/products.module';
import { Category } from './categories/categories.model';
import { OrdersModule } from './orders/orders.module';
import { OrderItem } from './orders/orderItem.model';
import { Product } from './products/products.model';
import { FilesModule } from './files/files.module';
import { LikesModule } from './likes/likes.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Order } from './orders/order.model';
import { User } from './users/users.model';
import { Like } from './likes/likes.model';
import { Cart } from './carts/carts.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Category, Product, Like, Cart, Order, OrderItem],
            autoLoadModels: true,
        }),
        UsersModule,
        AuthModule,
        CategoriesModule,
        FilesModule,
        ProductsModule,
        LikesModule,
        CartsModule,
        OrdersModule,
        StatisticsModule,
    ],
})
export class AppModule {}

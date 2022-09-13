import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Product } from 'src/products/products.model';
import { CartsController } from './carts.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CartsService } from './carts.service';
import { Cart } from './carts.model';

@Module({
    controllers: [CartsController],
    providers: [CartsService],
    imports: [SequelizeModule.forFeature([Cart, Product]), AuthModule, UsersModule],
})
export class CartsModule {}

import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/products.model';
import { LikesController } from './likes.controller';
import { UsersModule } from 'src/users/users.module';
import { LikesService } from './likes.service';
import { User } from 'src/users/users.model';
import { Like } from './likes.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [LikesController],
    providers: [LikesService],
    imports: [SequelizeModule.forFeature([Like, User, Product]), AuthModule, ProductsModule, UsersModule],
})
export class LikesModule {}

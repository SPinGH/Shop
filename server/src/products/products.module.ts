import { NestjsFormDataModule } from 'nestjs-form-data';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { Category } from 'src/categories/categories.model';
import { ProductsService } from './products.service';
import { FilesModule } from 'src/files/files.module';
import { Product } from './products.model';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Category, Product]),
        FilesModule,
        CategoriesModule,
        NestjsFormDataModule,
        AuthModule,
        UsersModule,
    ],
})
export class ProductsModule {}

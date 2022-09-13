import { NestjsFormDataModule } from 'nestjs-form-data';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsController } from './products.controller';
import { Category } from 'src/categories/categories.model';
import { ProductsService } from './products.service';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from './products.model';

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
    exports: [ProductsService],
})
export class ProductsModule {}

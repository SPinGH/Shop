import { NestjsFormDataModule } from 'nestjs-form-data';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Product } from 'src/products/products.model';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from './categories.model';

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService],
    imports: [
        SequelizeModule.forFeature([Category, Product]),
        FilesModule,
        NestjsFormDataModule,
        AuthModule,
        UsersModule,
    ],
    exports: [CategoriesService],
})
export class CategoriesModule {}

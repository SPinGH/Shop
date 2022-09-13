import { Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Category } from 'src/categories/categories.model';
import { Like } from 'src/likes/likes.model';

interface ProductCreationAttrs {
    name: string;
    description: string | null;
    img: string | null;
    price: number;
    discounted: number | null;
    categoryId: number;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Красное кресло', description: 'Название товара' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Кресло для гостиной', description: 'Описание товара' })
    @Column({ type: DataType.STRING, allowNull: true })
    description: string | null;

    @ApiProperty({ example: 'Название.jpg', description: 'Название файла с картинкой' })
    @Column({ type: DataType.STRING, allowNull: true })
    img: string | null;

    @ApiProperty({ example: 100, description: 'Цена товара' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @ApiProperty({ example: 90, description: 'Скидка на товар' })
    @Column({ type: DataType.INTEGER, allowNull: true })
    discounted: number | null;

    @ApiProperty({ example: 1, description: 'Категория товара' })
    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => Like)
    likes: Like[];
}

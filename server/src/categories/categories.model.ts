import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'src/products/products.model';

interface CategoryCreationAttrs {
    name: string;
    img: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Офис', description: 'Название категории' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({ example: 'Название.jpg', description: 'Название файла с картинкой' })
    @Column({ type: DataType.STRING, allowNull: false })
    img: string;

    @HasMany(() => Product)
    products: Product[];
}

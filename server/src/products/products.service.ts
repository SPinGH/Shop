import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CategoriesService } from 'src/categories/categories.service';
import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ChangeProductDto } from './dto/change-product.dto';
import { SearchResponse } from './dto/search-response.dto';
import { SearchRequest } from './dto/search-request.dto';
import { FilesService } from 'src/files/files.service';
import { ProductDto } from './dto/product.dto';
import { Like } from 'src/likes/likes.model';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Like) private likeRepository: typeof Like,
        private categoriesService: CategoriesService,
        private filesService: FilesService
    ) {}

    async getById(id: number) {
        return await this.productRepository.findOne({ where: { id } });
    }

    async getOne(id: number) {
        const product = await this.productRepository.findOne({ where: { id }, include: { all: true } });

        if (!product) {
            throw new HttpException('Товар с таким id не найден', HttpStatus.NOT_FOUND);
        }

        const likes = await this.likeRepository.count({ where: { productId: id } });

        return new ProductDto(product, likes);
    }

    async getRecomended(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new HttpException('Товар с таким id не найден', HttpStatus.NOT_FOUND);
        }

        const products = await this.productRepository.findAll({
            where: {
                [Op.not]: { id },
                categoryId: product.categoryId,
            },
            limit: 3,
        });

        return products.map((product) => new ProductDto(product));
    }

    async getAll(param: SearchRequest) {
        const { categoryId, query, limit = 5, page = 1 } = param;
        const offset = page * limit - limit;

        const where: WhereOptions<Product> = {};

        if (categoryId !== undefined) {
            where.categoryId = categoryId;
        }
        if (query) {
            where.name = { [Op.like]: `%${query.toLowerCase()}%` };
        }

        const response = await this.productRepository.findAndCountAll({ where, limit, offset });

        response.rows.map((product) => new ProductDto(product));

        return {
            rows: response.rows.map((product) => new ProductDto(product)),
            count: response.count,
        } as SearchResponse;
    }

    async create(productDto: CreateProductDto) {
        const category = await this.categoriesService.getOne(productDto.categoryId);

        if (!category) {
            throw new ValidationException([{ property: 'categoryId', errors: ['Категория с таким Id не найдена'] }]);
        }

        const fileName = await this.filesService.createFile(productDto.img);
        const product = await this.productRepository.create({ ...productDto, img: fileName });

        return new CreatedObjectDto(product);
    }

    async update(id: number, productDto: ChangeProductDto) {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new HttpException('Товар с таким id не найден', HttpStatus.NOT_FOUND);
        }

        if (productDto.categoryId !== undefined) {
            const category = await this.categoriesService.getOne(productDto.categoryId);

            if (!category) {
                throw new ValidationException([
                    { property: 'categoryId', errors: ['Категория с таким Id не найдена'] },
                ]);
            }

            product.categoryId = productDto.categoryId;
        }

        if (productDto.img !== undefined) {
            await this.filesService.deleteFile(product.img);

            const fileName = await this.filesService.createFile(productDto.img);

            product.img = fileName;
        }

        if (productDto.description !== undefined) product.description = productDto.description;
        if (productDto.discounted !== undefined) product.discounted = productDto.discounted;
        if (productDto.price !== undefined) product.price = productDto.price;
        if (productDto.name !== undefined) product.name = productDto.name;

        await product.save();
        return null;
    }

    async delete(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });

        if (!product) {
            throw new HttpException('Товар с таким id не найден', HttpStatus.NOT_FOUND);
        }

        await this.filesService.deleteFile(product.img);
        await product.destroy();
        return null;
    }
}

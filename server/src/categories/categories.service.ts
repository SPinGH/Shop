import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ChangeCategoryDto } from './dto/change-category.dto';
import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { FilesService } from 'src/files/files.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category) private categoryRepository: typeof Category,
        private filesService: FilesService
    ) {}

    async getById(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });
        return category;
    }

    async getOne(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new HttpException('Категория с таким id не найдена', HttpStatus.NOT_FOUND);
        }

        return new CategoryDto(category);
    }

    async getAll() {
        const categories = await this.categoryRepository.findAll();
        return categories.map((category) => new CategoryDto(category));
    }

    async create(categoryDto: CreateCategoryDto) {
        const candidate = await this.categoryRepository.findOne({ where: { name: categoryDto.name } });

        if (candidate) {
            throw new ValidationException([
                { property: 'name', errors: ['Категория с таким названием уже существует'] },
            ]);
        }

        const fileName = await this.filesService.createFile(categoryDto.img);
        const category = await this.categoryRepository.create({ ...categoryDto, img: fileName });

        return new CreatedObjectDto(category);
    }

    async update(id: number, categoryDto: ChangeCategoryDto) {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new HttpException('Категория с таким id не найдена', HttpStatus.NOT_FOUND);
        }

        if (categoryDto.name !== undefined) {
            const candidate = await this.categoryRepository.findOne({ where: { name: categoryDto.name } });

            if (candidate && candidate.id !== id) {
                throw new ValidationException([
                    { property: 'name', errors: ['Категория с таким названием уже существует'] },
                ]);
            }

            category.name = categoryDto.name;
        }

        if (categoryDto.img !== undefined) {
            await this.filesService.deleteFile(category.img);

            const fileName = await this.filesService.createFile(categoryDto.img);

            category.img = fileName;
        }

        await category.save();
        return null;
    }

    async delete(id: number) {
        const category = await this.categoryRepository.findOne({ where: { id } });

        if (!category) {
            throw new HttpException('Категория с таким id не найдена', HttpStatus.NOT_FOUND);
        }

        await category.destroy();
        await this.filesService.deleteFile(category.img);
        return null;
    }
}

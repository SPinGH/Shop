import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
} from '@nestjs/common';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BaseException } from 'src/exceptions/base.exception';
import { ChangeCategoryDto } from './dto/change-category.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CategoryDto } from './dto/category.dto';
import { IdParam } from 'src/dto/id-query.dto';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @ApiOperation({ summary: 'Получение всех категорий' })
    @ApiResponse({ status: HttpStatus.OK, type: [CategoryDto] })
    @Get()
    getAll() {
        return this.categoriesService.getAll();
    }

    @ApiOperation({ summary: 'Создание категории' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: HttpStatus.CREATED, type: CategoryDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @FormDataRequest()
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoryDto: CreateCategoryDto) {
        return this.categoriesService.create(categoryDto);
    }

    @ApiOperation({ summary: 'Изменение категории' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @FormDataRequest()
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param() param: IdParam, @Body() categoryDto: ChangeCategoryDto) {
        return this.categoriesService.update(param.id, categoryDto);
    }

    @ApiOperation({ summary: 'Изменение категории' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Категория успешно удалена' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @FormDataRequest()
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param() param: IdParam) {
        return this.categoriesService.delete(param.id);
    }
}

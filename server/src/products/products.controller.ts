import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';

import { ValidationException } from 'src/exceptions/validation.exception';
import { BaseException } from 'src/exceptions/base.exception';
import { CreateProductDto } from './dto/create-product.dto';
import { ChangeProductDto } from './dto/change-product.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SearchRequest } from './dto/search-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { IdParam } from 'src/dto/id-query.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({ summary: 'Получение всех товаров' })
    @ApiResponse({ status: HttpStatus.OK, type: [ProductDto] })
    @UsePipes(ValidationPipe)
    @Get()
    getAll(@Query() param: SearchRequest) {
        return this.productsService.getAll(param);
    }

    @ApiOperation({ summary: 'Создание товара' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: HttpStatus.CREATED, type: ProductDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @FormDataRequest()
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() productDto: CreateProductDto) {
        return this.productsService.create(productDto);
    }

    @ApiOperation({ summary: 'Изменение товара' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: HttpStatus.OK, type: ProductDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @FormDataRequest()
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param() param: IdParam, @Body() productDto: ChangeProductDto) {
        return this.productsService.update(param.id, productDto);
    }

    @ApiOperation({ summary: 'Удаление товара' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Товар успешно удален' })
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
        return this.productsService.delete(param.id);
    }
}

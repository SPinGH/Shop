import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    Req,
    UseGuards,
    UsePipes,
} from '@nestjs/common';

import { ValidationException } from 'src/exceptions/validation.exception';
import { BaseException } from 'src/exceptions/base.exception';
import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateCartDto } from './dto/create-cart.dto';
import { ChangeCartDto } from './dto/change-cart.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { CartsService } from './carts.service';
import { IdParam } from 'src/dto/id-query.dto';
import { CartDto } from './dto/cart.dto';

@ApiTags('Корзина')
@Controller('carts')
export class CartsController {
    constructor(private cartsService: CartsService) {}

    @ApiOperation({ summary: 'Получение корзины' })
    @ApiResponse({ status: HttpStatus.OK, type: [CartDto] })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() request: Request & { user: UserDto }) {
        return this.cartsService.get(request.user.id);
    }

    @ApiOperation({ summary: 'Добавление товара в корзину' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CreatedObjectDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Req() request: Request & { user: UserDto }, @Body() cartDto: CreateCartDto) {
        return this.cartsService.create(request.user.id, cartDto);
    }

    @ApiOperation({ summary: 'Изменение количества товара в корзине' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Товар успешно изменён' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    update(@Param() param: IdParam, @Body() cartDto: ChangeCartDto) {
        return this.cartsService.update(param.id, cartDto);
    }

    @ApiOperation({ summary: 'Удаление товара из корзины' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Товар успешно удален' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param() param: IdParam) {
        return this.cartsService.delete(param.id);
    }
}

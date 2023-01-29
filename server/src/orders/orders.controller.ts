import { Controller, Get, HttpStatus, Post, Req, UseGuards, UsePipes, Query, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { BaseException } from 'src/exceptions/base.exception';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SearchRequest } from './dto/search-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UserOrderDto } from './dto/user-order.dto';
import { OrdersService } from './orders.service';
import { UserDto } from 'src/users/dto/user.dto';
import { IdParam } from 'src/dto/id-query.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Получение заказов пользователя' })
    @ApiResponse({ status: HttpStatus.OK, type: [OrderDto] })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Get()
    get(@Req() request: Request & { user: UserDto }) {
        return this.ordersService.get(request.user.id);
    }

    @ApiOperation({ summary: 'Получение всех заказов' })
    @ApiResponse({ status: HttpStatus.OK, type: [UserOrderDto] })
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAll(@Query() param: SearchRequest) {
        return this.ordersService.getAll(param);
    }

    @ApiOperation({ summary: 'Создание заказа' })
    @ApiResponse({ status: HttpStatus.OK, type: CreatedObjectDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() request: Request & { user: UserDto }) {
        return this.ordersService.create(request.user.id);
    }

    @ApiOperation({ summary: 'Удаление заказа' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Заказ успешно удален' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param() param: IdParam) {
        return this.ordersService.delete(param.id);
    }
}

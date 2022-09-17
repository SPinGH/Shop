import { Controller, Get, HttpStatus, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { BaseException } from 'src/exceptions/base.exception';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { OrdersService } from './orders.service';
import { UserDto } from 'src/users/dto/user.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Получение заказов' })
    @ApiResponse({ status: HttpStatus.OK, type: [OrderDto] })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() request: Request & { user: UserDto }) {
        return this.ordersService.getAll(request.user.id);
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
}

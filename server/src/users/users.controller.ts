import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidationException } from 'src/exceptions/validation.exception';
import { BaseException } from 'src/exceptions/base.exception';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ChangeUserDto } from './dto/change-user.dto';
import { UsersService } from './users.service';
import { IdParam } from './dto/id-query.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение авторизованного пользователя' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @UseGuards(JwtAuthGuard)
    @Get()
    getOne(@Req() request: Request & { user: UserDto }) {
        return request.user;
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: HttpStatus.OK, type: [UserDto] })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: BaseException })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Изменеие данных пользователя' })
    @ApiResponse({ status: HttpStatus.OK, type: UserDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: BaseException })
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put('/:id')
    change(@Req() request: Request & { user: UserDto }, @Param() param: IdParam, @Body() userDto: ChangeUserDto) {
        return this.usersService.changeUser(request.user, param.id, userDto);
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь успешно удален' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: BaseException })
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    delete(@Req() request: Request & { user: UserDto }, @Param() param: IdParam) {
        return this.usersService.deleteUser(request.user, param.id);
    }
}

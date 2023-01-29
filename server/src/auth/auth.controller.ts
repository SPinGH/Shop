import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ValidationException } from 'src/exceptions/validation.exception';
import { BaseException } from 'src/exceptions/base.exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация' })
    @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: BaseException })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: HttpStatus.OK, type: AuthResponseDto })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Post('/registration')
    @HttpCode(HttpStatus.OK)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
}

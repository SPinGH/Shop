import { Controller, UsePipes, Get, HttpStatus, Query, UseGuards, Req, Post, HttpCode, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidationException } from 'src/exceptions/validation.exception';
import { BaseException } from 'src/exceptions/base.exception';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLikeDto } from './dto/create-like.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { LikeDto } from './dto/like.dto';

import { LikesService } from './likes.service';

@ApiTags('Лайки')
@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    @ApiOperation({ summary: 'Получение статуса лайка' })
    @ApiResponse({ status: HttpStatus.OK, type: LikeDto })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() request: Request & { user: UserDto }, @Query() param: CreateLikeDto) {
        console.log(param);

        return this.likesService.getStatus(request.user.id, param.productId);
    }

    @ApiOperation({ summary: 'Изменение статуса лайка' })
    @ApiResponse({ status: HttpStatus.OK, type: LikeDto })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: BaseException })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationException })
    @UsePipes(ValidationPipe)
    @Roles('USER')
    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Req() request: Request & { user: UserDto }, @Body() likeDto: CreateLikeDto) {
        return this.likesService.toggle(request.user.id, likeDto.productId);
    }
}

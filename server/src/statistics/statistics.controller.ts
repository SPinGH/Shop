import { Controller, Get, HttpStatus, UseGuards, UsePipes, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidationPipe } from 'src/pipes/validation.pipe';
import { PopularRequest } from './dto/popular-request.dto';
import { ProductDto } from 'src/products/dto/product.dto';
import { ProfitRequest } from './dto/profit-request.dto';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { ProfitDto } from './dto/profit.dto';
import { TotalDto } from './dto/total.dto';

@ApiTags('Статистика')
@Controller('statistics')
export class StatisticsController {
    constructor(private statisticsService: StatisticsService) {}

    @ApiOperation({ summary: 'Получение общей статистики' })
    @ApiResponse({ status: HttpStatus.OK, type: TotalDto })
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/total')
    getTotal() {
        return this.statisticsService.getTotal();
    }

    @ApiOperation({ summary: 'Получение топ 5 товаров' })
    @ApiResponse({ status: HttpStatus.OK, type: [ProductDto] })
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/popular')
    getPopular(@Query() param: PopularRequest) {
        return this.statisticsService.getPopular(param);
    }

    @ApiOperation({ summary: 'Получение прибыли' })
    @ApiResponse({ status: HttpStatus.OK, type: [ProfitDto] })
    @UsePipes(ValidationPipe)
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard)
    @Get('/profit')
    getProfit(@Query() param: ProfitRequest) {
        return this.statisticsService.getProfit(param);
    }
}

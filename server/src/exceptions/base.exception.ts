import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BaseException extends HttpException {
    @ApiProperty({ example: 403, description: 'Status Code ошибки' })
    statusCode: number;
    @ApiProperty({ example: 'Нет доступа', description: 'Сообщение ошибки' })
    message: string;
}

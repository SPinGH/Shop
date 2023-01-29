import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationError {
    @ApiProperty({ example: 'email', description: 'Поле ошибки' })
    property: string;

    @ApiProperty({ example: ['Некорректный email'], description: 'Массив ошибок' })
    errors: string[];
}

export class ValidationException extends HttpException {
    @ApiProperty({ example: 400, description: 'Status Code ошибки' })
    statusCode: number;
    @ApiProperty({ type: [ValidationError], description: 'Массив ошибок' })
    messages: ValidationError[];

    constructor(response: ValidationError[]) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                messages: response,
            },
            HttpStatus.BAD_REQUEST
        );
    }
}

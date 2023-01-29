import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ example: 'token', description: 'Токен' })
    readonly token: string;
}

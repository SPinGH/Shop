import { ApiProperty } from '@nestjs/swagger';
import { UserOrderDto } from './user-order.dto';

export class SearchResponse {
    @ApiProperty({ description: 'Заказы' })
    readonly rows: UserOrderDto[];

    @ApiProperty({ example: 12, description: 'Общее количество заказов' })
    readonly count: number;
}

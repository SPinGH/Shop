import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
    @ApiProperty({ example: true, description: 'Статус лайка' })
    readonly status: boolean;

    constructor(status: boolean) {
        this.status = status;
    }
}

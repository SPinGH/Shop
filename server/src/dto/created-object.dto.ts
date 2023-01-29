import { ApiProperty } from '@nestjs/swagger';

export class CreatedObjectDto {
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    readonly id: number;

    constructor(obj: { id: number }) {
        this.id = obj.id;
    }
}

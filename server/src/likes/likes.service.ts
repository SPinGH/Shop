import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { ValidationException } from 'src/exceptions/validation.exception';
import { ProductsService } from 'src/products/products.service';
import { LikeDto } from './dto/like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepository: typeof Like, private productsService: ProductsService) {}

    async getStatus(userId: number, productId: number) {
        const like = await this.likeRepository.findOne({ where: { userId, productId } });

        return new LikeDto(!!like);
    }

    async toggle(userId: number, productId: number) {
        const like = await this.likeRepository.findOne({ where: { userId, productId } });

        if (like) {
            like.destroy();
            return new LikeDto(false);
        } else {
            const product = await this.productsService.getById(productId);
            if (!product) {
                throw new ValidationException([{ property: 'productId', errors: ['Товар с таким Id не найден'] }]);
            }

            await this.likeRepository.create({ userId, productId });
            return new LikeDto(true);
        }
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CreatedObjectDto } from 'src/dto/created-object.dto';
import { Product } from 'src/products/products.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { ChangeCartDto } from './dto/change-cart.dto';
import { CartDto } from './dto/cart.dto';
import { Cart } from './carts.model';

@Injectable()
export class CartsService {
    constructor(
        @InjectModel(Cart) private cartRepository: typeof Cart,
        @InjectModel(Product) private productRepository: typeof Product
    ) {}

    async get(userId: number) {
        const carts = await this.cartRepository.findAll({ where: { userId }, include: Product });
        return carts.map((cart) => new CartDto(cart));
    }

    async create(userId: number, cartDto: CreateCartDto) {
        const { productId, quantity } = cartDto;

        const cartCandidate = await this.cartRepository.findOne({ where: { userId, productId } });

        if (cartCandidate) {
            throw new ValidationException([{ property: 'productId', errors: ['Товар уже есть в корзине'] }]);
        }

        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new ValidationException([{ property: 'productId', errors: ['Товар с таким Id не найден'] }]);
        }

        const cart = await this.cartRepository.create({ userId, productId, quantity });
        return new CreatedObjectDto(cart);
    }

    async update(id: number, cartDto: ChangeCartDto) {
        const cart = await this.cartRepository.findOne({ where: { id }, include: Product });

        if (!cart) {
            throw new HttpException('Элемент корзины с таким Id не найден', HttpStatus.NOT_FOUND);
        }

        cart.quantity = cartDto.quantity;
        await cart.save();
        return null;
    }

    async delete(id: number) {
        const cart = await this.cartRepository.findOne({ where: { id } });

        if (!cart) {
            throw new HttpException('Элемент корзины с таким Id не найден', HttpStatus.NOT_FOUND);
        }

        await cart.destroy();
        return null;
    }
}

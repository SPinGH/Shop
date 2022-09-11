import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async addUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users.map((user) => new UserDto(user));
    }

    async changeUser(initiator: UserDto, id: number, dto: ChangeUserDto) {
        const user = await this.getUser(initiator, id);

        const candidate = await this.getUserByEmail(dto.email);
        if (candidate) {
            throw new ValidationException([
                { property: 'email', errors: ['Пользователь с таким email уже существует'] },
            ]);
        }

        user.email = dto.email;
        await user.save();

        return new UserDto(user);
    }

    async deleteUser(initiator: UserDto, id: number) {
        const user = await this.getUser(initiator, id);

        return await user.destroy();
    }

    private async getUser(initiator: UserDto, id: number) {
        if (initiator.role !== 'ADMIN' && initiator.id !== id) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }

        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException('Пользователь с таким id не найден', HttpStatus.NOT_FOUND);
        }

        return user;
    }
}

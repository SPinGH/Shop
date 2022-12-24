import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { ValidationException } from 'src/exceptions/validation.exception';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return {
            token: this.generateToken(user),
        };
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new ValidationException([
                { property: 'email', errors: ['Пользователь с таким email уже существует'] },
            ]);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.addUser({ ...userDto, password: hashPassword });
        return {
            token: this.generateToken(user),
        };
    }

    private generateToken(user: User) {
        const payload: UserDto = { id: user.id, email: user.email, role: user.role, address: user.address };
        return this.jwtService.sign(payload);
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);

        if (!user) {
            throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND);
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new HttpException('Некоректный email или пароль', HttpStatus.UNAUTHORIZED);
    }
}

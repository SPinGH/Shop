import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { ROLES_KEY } from './roles-auth.decorator';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private usersService: UsersService, private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
            }

            const tokenUser = this.jwtService.verify(token);

            const user = await this.usersService.getUserById(tokenUser.id);

            if (!user) {
                throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
            }

            if (requiredRoles && !requiredRoles.includes(user.role)) {
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
            }

            req.user = new UserDto(user);
            return true;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);
        }
    }
}

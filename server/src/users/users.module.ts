import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { Like } from 'src/likes/likes.model';
import { User } from './users.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User, Like]), forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}

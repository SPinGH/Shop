import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { User } from './users.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}

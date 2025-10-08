import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}

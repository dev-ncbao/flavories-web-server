import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Recipe } from 'src/recipes/recipes.model';
import { Course } from 'src/courses/courses.model';
import { UserController } from './user.controller';

@Module({
    imports: [SequelizeModule.forFeature([User, Recipe, Course])],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule {}

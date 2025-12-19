'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeCommentsController } from './recipe-comments.controller';
import { RecipeCommentsService } from './recipe-comments.service';
import { RecipeComment } from './recipe-comments.model';
import { Recipe } from 'src/recipes/recipes.model';
import { User } from 'src/users/user.model';

@Module({
    imports: [SequelizeModule.forFeature([RecipeComment, Recipe, User])],
    controllers: [RecipeCommentsController],
    providers: [RecipeCommentsService],
    exports: [RecipeCommentsService]
})
export class RecipeCommentsModule {}


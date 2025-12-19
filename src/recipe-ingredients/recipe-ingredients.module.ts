'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeIngredientsController } from './recipe-ingredients.controller';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { RecipeIngredient } from './recipe-ingredients.model';

@Module({
    imports: [SequelizeModule.forFeature([RecipeIngredient])],
    controllers: [RecipeIngredientsController],
    providers: [RecipeIngredientsService],
    exports: [RecipeIngredientsService]
})
export class RecipeIngredientsModule {}


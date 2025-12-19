'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.model';
import { RecipeIngredient } from 'src/recipe-ingredients/recipe-ingredients.model';
import { Ingredient } from 'src/ingredients/ingredients.model';
import { Unit } from 'src/units/units.model';
import { RecipeComment } from 'src/recipe-comments/recipe-comments.model';
import { RecipeStep } from 'src/recipe-steps/recipe-steps.model';

@Module({
    imports: [
        SequelizeModule.forFeature([
            Recipe,
            RecipeIngredient,
            Ingredient,
            Unit,
            RecipeComment,
            RecipeStep
        ])
    ],
    controllers: [RecipesController],
    providers: [RecipesService],
    exports: [RecipesService]
})
export class RecipesModule {}

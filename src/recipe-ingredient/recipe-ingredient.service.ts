import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeIngredient } from './recipe-ingredient.model';

@Injectable()
export class RecipeIngredientService {
    constructor(
        @InjectModel(RecipeIngredient)
        private recipeIngredientModel: typeof RecipeIngredient
    ) {}

    async findByRecipeId(recipeId: number): Promise<RecipeIngredient[]> {
        return this.recipeIngredientModel.findAll({
            where: { recipeId }
        });
    }
}

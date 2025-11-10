import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe) private recipeModel: typeof Recipe) {}

    async getAllRecipe(): Promise<Recipe[]> {
        const recipes = await this.recipeModel.findAll();
        return recipes;
    }

    async getTrendingRecipes(limit: number = 10): Promise<Recipe[]> {
        const recipes = await this.recipeModel.findAll({
            order: [['trendingScore', 'DESC']],
            limit: limit
        });
        return recipes;
    }
}

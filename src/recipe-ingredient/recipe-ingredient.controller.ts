import { Controller, Get, Param } from '@nestjs/common';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { RecipeIngredientDto } from './recipe-ingredient.dto';

@Controller('recipe-ingredients')
export class RecipeIngredientController {
    constructor(private readonly service: RecipeIngredientService) {}

    @Get('recipe/:recipeId')
    async findByRecipeId(
        @Param('recipeId') recipeId: number
    ): Promise<RecipeIngredientDto[]> {
        const recipeIngredients = await this.service.findByRecipeId(recipeId);

        return recipeIngredients.map<RecipeIngredientDto>((ri) => ({
            id: ri.id as number,
            recipeId: ri.getRecipeId(),
            ingredientId: ri.getIngredientId(),
            amount: ri.getAmount()
        }));
    }
}

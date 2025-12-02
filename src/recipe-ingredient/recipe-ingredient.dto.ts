import { RecipeIngredient } from './recipe-ingredient.model';

export class RecipeIngredientDto {
    id?: number;
    recipeId?: number;
    ingredientId?: number;
    amount?: number;

    static fromModel(model: RecipeIngredient): RecipeIngredientDto {
        return {
            id: model.getId(),
            recipeId: model.getRecipeId(),
            ingredientId: model.getIngredientId(),
            amount: model.getAmount()
        };
    }
}

import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get()
    async getAllRecipe(): Promise<RecipeDto[]> {
        const recipes = await this.recipeService.getAllRecipe();

        const response: RecipeDto[] = recipes.map((recipe) => ({
            id: Number(recipe.id),
            name: recipe.getName(),
            description: recipe.getDescription(),
            image: recipe.getImage()
        }));

        return response;
    }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
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
            image: recipe.getImage(),
            rating: recipe.getRating(),
            likeCount: recipe.getLikeCount(),
            dislikeCount: recipe.getDislikeCount(),
            viewCount: recipe.getViewCount(),
            commentCount: recipe.getCommentCount(),
            trendingScore: recipe.getTrendingScore()
        }));

        return response;
    }

    @Get('trending')
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of trending recipes to return (default: 10)' })
    async getTrendingRecipes(
        @Query('limit') limit?: string
    ): Promise<RecipeDto[]> {
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        const recipes = await this.recipeService.getTrendingRecipes(
            limitNumber
        );

        const response: RecipeDto[] = recipes.map((recipe) => ({
            id: Number(recipe.id),
            name: recipe.getName(),
            description: recipe.getDescription(),
            image: recipe.getImage(),
            rating: recipe.getRating(),
            likeCount: recipe.getLikeCount(),
            dislikeCount: recipe.getDislikeCount(),
            viewCount: recipe.getViewCount(),
            commentCount: recipe.getCommentCount(),
            trendingScore: recipe.getTrendingScore(),
            createdAt: recipe.getCreatedAt(),
        }));

        return response;
    }
}

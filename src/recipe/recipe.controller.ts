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
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of recipes per page (default: 10)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for infinite scroll (default: 1)' })
    @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Filter recipes created after this date (ISO format)' })
    @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Filter recipes created before this date (ISO format)' })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'trendingScore', 'createdAt'], description: 'Sort field (default: trendingScore)' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' })
    async getTrendingRecipes(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('sortBy') sortBy?: 'name' | 'trendingScore' | 'createdAt',
        @Query('sortOrder') sortOrder?: 'ASC' | 'DESC'
    ): Promise<RecipeDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            sortBy: sortBy,
            sortOrder: sortOrder
        };

        const recipes = await this.recipeService.getTrendingRecipes(options);

        // Sort by trendingScore DESC to determine true rankings
        const sortedByTrending = [...recipes].sort((a, b) => 
            b.getTrendingScore() - a.getTrendingScore()
        );

        // Create a map of recipe id to ranking
        const rankingMap = new Map<number, number>();
        sortedByTrending.forEach((recipe, index) => {
            rankingMap.set(Number(recipe.id), index + 1);
        });

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
            ranking: rankingMap.get(Number(recipe.id)) || 0
        }));

        return response;
    }

    @Get('new')
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of recipes per page (default: 10)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for infinite scroll (default: 1)' })
    @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Filter recipes created after this date (ISO format)' })
    @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Filter recipes created before this date (ISO format)' })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'createdAt'], description: 'Sort field (default: createdAt)' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' })
    async getNewRecipes(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('sortBy') sortBy?: 'name' | 'createdAt',
        @Query('sortOrder') sortOrder?: 'ASC' | 'DESC'
    ): Promise<RecipeDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            sortBy: sortBy,
            sortOrder: sortOrder
        };

        const recipes = await this.recipeService.getNewRecipes(options);

        // Sort by createdAt DESC to determine true rankings (newest first)
        const sortedByDate = [...recipes].sort((a, b) => 
            b.getCreatedAt().getTime() - a.getCreatedAt().getTime()
        );

        // Create a map of recipe id to ranking
        const rankingMap = new Map<number, number>();
        sortedByDate.forEach((recipe, index) => {
            rankingMap.set(Number(recipe.id), index + 1);
        });

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
            ranking: rankingMap.get(Number(recipe.id)) || 0
        }));

        return response;
    }

    @Get('popular')
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of popular recipes to return (default: 10)' })
    async getMostPopularRecipes(
        @Query('limit') limit?: string
    ): Promise<RecipeDto[]> {
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        const recipes = await this.recipeService.getMostPopularRecipes(
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

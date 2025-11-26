import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './recipe.dto';

@Controller('recipes')
export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of recipes per page (default: 10)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for infinite scroll (default: 1)' })
    @ApiQuery({ name: 'startDate', required: false, type: String, description: 'Filter recipes created after this date (ISO format)' })
    @ApiQuery({ name: 'endDate', required: false, type: String, description: 'Filter recipes created before this date (ISO format)' })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'trendingScore', 'createdAt'], description: 'Sort field (default: trendingScore)' })
    @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' })
    async getRecipes(
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
            sortBy: sortBy || 'trendingScore',
            sortOrder: sortOrder || 'DESC'
        };

        const recipes = await this.recipeService.getRecipes(options);

        return recipes;
    }
}

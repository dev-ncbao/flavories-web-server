import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ViewService } from './view.service';
import { ViewDto, CreateViewDto } from './view.dto';

@ApiTags('views')
@Controller('views')
export class ViewController {
    constructor(private viewService: ViewService) {}

    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of views per page (default: 10)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'recipeId', required: false, type: Number, description: 'Filter by recipe ID' })
    @ApiQuery({ name: 'userId', required: false, type: Number, description: 'Filter by user ID' })
    async getViews(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('recipeId') recipeId?: string,
        @Query('userId') userId?: string
    ): Promise<ViewDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            recipeId: recipeId ? parseInt(recipeId, 10) : undefined,
            userId: userId ? parseInt(userId, 10) : undefined
        };

        const views = await this.viewService.getViews(options);

        return views.map((view) => ({
            id: Number(view.id),
            userId: view.getUserId(),
            recipeId: view.getRecipeId(),
            createdAt: view.getCreatedAt(),
            updatedAt: view.getUpdatedAt()
        }));
    }

    @Get('recipe/:recipeId/count')
    async getViewCount(@Param('recipeId') recipeId: string): Promise<{ count: number }> {
        const count = await this.viewService.getViewCount(parseInt(recipeId, 10));
        return { count };
    }

    @Get('recipe/:recipeId/unique-count')
    async getUniqueViewCount(@Param('recipeId') recipeId: string): Promise<{ count: number }> {
        const count = await this.viewService.getUniqueViewCount(parseInt(recipeId, 10));
        return { count };
    }

    @Get(':id')
    async getViewById(@Param('id') id: string): Promise<ViewDto> {
        const view = await this.viewService.getViewById(parseInt(id, 10));
        
        if (!view) {
            throw new Error('View not found');
        }

        return {
            id: Number(view.id),
            userId: view.getUserId(),
            recipeId: view.getRecipeId(),
            createdAt: view.getCreatedAt(),
            updatedAt: view.getUpdatedAt()
        };
    }

    @Post()
    async createView(@Body() createViewDto: CreateViewDto): Promise<ViewDto> {
        const view = await this.viewService.createView(createViewDto);

        return {
            id: Number(view.id),
            userId: view.getUserId(),
            recipeId: view.getRecipeId(),
            createdAt: view.getCreatedAt(),
            updatedAt: view.getUpdatedAt()
        };
    }

    @Delete(':id')
    async deleteView(@Param('id') id: string): Promise<{ message: string }> {
        await this.viewService.deleteView(parseInt(id, 10));
        return { message: 'View deleted successfully' };
    }
}

import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DislikeService } from './dislike.service';
import { DislikeDto, CreateDislikeDto } from './dislike.dto';

@ApiTags('dislikes')
@Controller('dislikes')
export class DislikeController {
    constructor(private dislikeService: DislikeService) {}

    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of dislikes per page (default: 10)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'recipeId', required: false, type: Number, description: 'Filter by recipe ID' })
    @ApiQuery({ name: 'userId', required: false, type: Number, description: 'Filter by user ID' })
    async getDislikes(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('recipeId') recipeId?: string,
        @Query('userId') userId?: string
    ): Promise<DislikeDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            recipeId: recipeId ? parseInt(recipeId, 10) : undefined,
            userId: userId ? parseInt(userId, 10) : undefined
        };

        const dislikes = await this.dislikeService.getDislikes(options);

        return dislikes.map((dislike) => ({
            id: Number(dislike.id),
            userId: dislike.getUserId(),
            recipeId: dislike.getRecipeId(),
            createdAt: dislike.getCreatedAt(),
            updatedAt: dislike.getUpdatedAt()
        }));
    }

    @Get('recipe/:recipeId/count')
    async getDislikeCount(@Param('recipeId') recipeId: string): Promise<{ count: number }> {
        const count = await this.dislikeService.getDislikeCount(parseInt(recipeId, 10));
        return { count };
    }

    @Get(':id')
    async getDislikeById(@Param('id') id: string): Promise<DislikeDto> {
        const dislike = await this.dislikeService.getDislikeById(parseInt(id, 10));
        
        if (!dislike) {
            throw new Error('Dislike not found');
        }

        return {
            id: Number(dislike.id),
            userId: dislike.getUserId(),
            recipeId: dislike.getRecipeId(),
            createdAt: dislike.getCreatedAt(),
            updatedAt: dislike.getUpdatedAt()
        };
    }

    @Post()
    async createDislike(@Body() createDislikeDto: CreateDislikeDto): Promise<DislikeDto> {
        const dislike = await this.dislikeService.createDislike(createDislikeDto);

        return {
            id: Number(dislike.id),
            userId: dislike.getUserId(),
            recipeId: dislike.getRecipeId(),
            createdAt: dislike.getCreatedAt(),
            updatedAt: dislike.getUpdatedAt()
        };
    }

    @Delete(':id')
    async deleteDislike(@Param('id') id: string): Promise<{ message: string }> {
        await this.dislikeService.deleteDislike(parseInt(id, 10));
        return { message: 'Dislike deleted successfully' };
    }
}

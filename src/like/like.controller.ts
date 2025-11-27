import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { LikeDto, CreateLikeDto } from './like.dto';

@ApiTags('likes')
@Controller('likes')
export class LikeController {
    constructor(private likeService: LikeService) {}

    @Get()
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of likes per page (default: 10)'
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)'
    })
    @ApiQuery({
        name: 'recipeId',
        required: false,
        type: Number,
        description: 'Filter by recipe ID'
    })
    @ApiQuery({
        name: 'userId',
        required: false,
        type: Number,
        description: 'Filter by user ID'
    })
    async getLikes(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('recipeId') recipeId?: string,
        @Query('userId') userId?: string
    ): Promise<LikeDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            recipeId: recipeId ? parseInt(recipeId, 10) : undefined,
            userId: userId ? parseInt(userId, 10) : undefined
        };

        const likes = await this.likeService.getLikes(options);

        return likes.map((like) => ({
            id: Number(like.id),
            userId: like.getUserId(),
            recipeId: like.getRecipeId(),
            createdAt: like.getCreatedAt(),
            updatedAt: like.getUpdatedAt()
        }));
    }

    @Get('recipe/:recipeId/count')
    async getLikeCount(
        @Param('recipeId') recipeId: string
    ): Promise<{ count: number }> {
        const count = await this.likeService.getLikeCount(
            parseInt(recipeId, 10)
        );
        return { count };
    }

    @Get(':id')
    async getLikeById(@Param('id') id: string): Promise<LikeDto> {
        const like = await this.likeService.getLikeById(parseInt(id, 10));

        if (!like) {
            throw new Error('Like not found');
        }

        return {
            id: Number(like.id),
            userId: like.getUserId(),
            recipeId: like.getRecipeId(),
            createdAt: like.getCreatedAt(),
            updatedAt: like.getUpdatedAt()
        };
    }

    @Post()
    async createLike(@Body() createLikeDto: CreateLikeDto): Promise<LikeDto> {
        const like = await this.likeService.createLike(createLikeDto);

        return {
            id: Number(like.id),
            userId: like.getUserId(),
            recipeId: like.getRecipeId(),
            createdAt: like.getCreatedAt(),
            updatedAt: like.getUpdatedAt()
        };
    }

    @Delete(':id')
    async deleteLike(@Param('id') id: string): Promise<{ message: string }> {
        await this.likeService.deleteLike(parseInt(id, 10));
        return { message: 'Like deleted successfully' };
    }
}

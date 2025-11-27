import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { RatingDto, CreateRatingDto, UpdateRatingDto } from './rating.dto';

@ApiTags('ratings')
@Controller('ratings')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @Get()
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of ratings per page (default: 10)'
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
    async getRatings(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('recipeId') recipeId?: string,
        @Query('userId') userId?: string
    ): Promise<RatingDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            recipeId: recipeId ? parseInt(recipeId, 10) : undefined,
            userId: userId ? parseInt(userId, 10) : undefined
        };

        const ratings = await this.ratingService.getRatings(options);

        return ratings.map((rating) => ({
            id: Number(rating.id),
            userId: rating.getUserId(),
            recipeId: rating.getRecipeId(),
            rating: rating.getRating(),
            createdAt: rating.getCreatedAt(),
            updatedAt: rating.getUpdatedAt()
        }));
    }

    @Get('recipe/:recipeId/average')
    async getAverageRating(
        @Param('recipeId') recipeId: string
    ): Promise<{ averageRating: number }> {
        const average = await this.ratingService.getAverageRating(
            parseInt(recipeId, 10)
        );
        return { averageRating: average };
    }

    @Get(':id')
    async getRatingById(@Param('id') id: string): Promise<RatingDto> {
        const rating = await this.ratingService.getRatingById(parseInt(id, 10));

        if (!rating) {
            throw new Error('Rating not found');
        }

        return {
            id: Number(rating.id),
            userId: rating.getUserId(),
            recipeId: rating.getRecipeId(),
            rating: rating.getRating(),
            createdAt: rating.getCreatedAt(),
            updatedAt: rating.getUpdatedAt()
        };
    }

    @Post()
    async createRating(
        @Body() createRatingDto: CreateRatingDto
    ): Promise<RatingDto> {
        const rating = await this.ratingService.createRating(createRatingDto);

        return {
            id: Number(rating.id),
            userId: rating.getUserId(),
            recipeId: rating.getRecipeId(),
            rating: rating.getRating(),
            createdAt: rating.getCreatedAt(),
            updatedAt: rating.getUpdatedAt()
        };
    }

    @Put(':id')
    async updateRating(
        @Param('id') id: string,
        @Body() updateRatingDto: UpdateRatingDto
    ): Promise<RatingDto> {
        const rating = await this.ratingService.updateRating(
            parseInt(id, 10),
            updateRatingDto
        );

        return {
            id: Number(rating.id),
            userId: rating.getUserId(),
            recipeId: rating.getRecipeId(),
            rating: rating.getRating(),
            createdAt: rating.getCreatedAt(),
            updatedAt: rating.getUpdatedAt()
        };
    }

    @Delete(':id')
    async deleteRating(@Param('id') id: string): Promise<{ message: string }> {
        await this.ratingService.deleteRating(parseInt(id, 10));
        return { message: 'Rating deleted successfully' };
    }
}

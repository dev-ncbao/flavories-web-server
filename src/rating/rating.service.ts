import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rating } from './rating.model';
import { CreateRatingDto, UpdateRatingDto } from './rating.dto';

interface GetRatingsOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
}

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating) private ratingModel: typeof Rating) {}

    async getRatings(options: GetRatingsOptions = {}): Promise<Rating[]> {
        const {
            limit = 10,
            page = 1,
            recipeId,
            userId
        } = options;

        const offset = (page - 1) * limit;

        const whereClause: Record<string, number> = {};
        
        if (recipeId !== undefined) {
            whereClause.recipeId = recipeId;
        }
        
        if (userId !== undefined) {
            whereClause.userId = userId;
        }

        const ratings = await this.ratingModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        return ratings;
    }

    async getRatingById(id: number): Promise<Rating> {
        return await this.ratingModel.findByPk(id);
    }

    async getRatingByUserAndRecipe(userId: number, recipeId: number): Promise<Rating> {
        return await this.ratingModel.findOne({
            where: { userId, recipeId }
        });
    }

    async createRating(createRatingDto: CreateRatingDto): Promise<Rating> {
        // Check if user already rated this recipe
        const existing = await this.getRatingByUserAndRecipe(
            createRatingDto.userId,
            createRatingDto.recipeId
        );

        if (existing) {
            throw new Error('User has already rated this recipe');
        }

        return await this.ratingModel.create({
            userId: createRatingDto.userId,
            recipeId: createRatingDto.recipeId,
            rating: createRatingDto.rating
        });
    }

    async updateRating(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        const rating = await this.ratingModel.findByPk(id);
        if (!rating) {
            throw new Error('Rating not found');
        }
        
        rating.rating = updateRatingDto.rating;
        await rating.save();
        return rating;
    }

    async deleteRating(id: number): Promise<void> {
        const rating = await this.ratingModel.findByPk(id);
        if (!rating) {
            throw new Error('Rating not found');
        }
        await rating.destroy();
    }

    async getAverageRating(recipeId: number): Promise<number> {
        const result = await this.ratingModel.findOne({
            where: { recipeId },
            attributes: [
                [this.ratingModel.sequelize.fn('AVG', this.ratingModel.sequelize.col('rating')), 'avgRating']
            ],
            raw: true
        }) as { avgRating?: string | number } | null;

        const avgRaw = result?.avgRating ?? 0;
        if (typeof avgRaw === 'string') {
            const parsed = parseFloat(avgRaw);
            return Number.isNaN(parsed) ? 0 : parsed;
        }
        const num = Number(avgRaw);
        return Number.isNaN(num) ? 0 : num;
    }
}

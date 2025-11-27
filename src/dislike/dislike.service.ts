import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Dislike } from './dislike.model';
import { CreateDislikeDto } from './dislike.dto';

interface GetDislikesOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
}

@Injectable()
export class DislikeService {
    constructor(@InjectModel(Dislike) private dislikeModel: typeof Dislike) {}

    async getDislikes(options: GetDislikesOptions = {}): Promise<Dislike[]> {
        const { limit = 10, page = 1, recipeId, userId } = options;

        const offset = (page - 1) * limit;

        const whereClause: Record<string, number> = {};

        if (recipeId !== undefined) {
            whereClause.recipeId = recipeId;
        }

        if (userId !== undefined) {
            whereClause.userId = userId;
        }

        const dislikes = await this.dislikeModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        return dislikes;
    }

    async getDislikeById(id: number): Promise<Dislike> {
        return await this.dislikeModel.findByPk(id);
    }

    async getDislikeByUserAndRecipe(
        userId: number,
        recipeId: number
    ): Promise<Dislike> {
        return await this.dislikeModel.findOne({
            where: { userId, recipeId }
        });
    }

    async createDislike(createDislikeDto: CreateDislikeDto): Promise<Dislike> {
        // Check if user already disliked this recipe
        const existing = await this.getDislikeByUserAndRecipe(
            createDislikeDto.userId,
            createDislikeDto.recipeId
        );

        if (existing) {
            throw new Error('User has already disliked this recipe');
        }

        return await this.dislikeModel.create({
            userId: createDislikeDto.userId,
            recipeId: createDislikeDto.recipeId
        });
    }

    async deleteDislike(id: number): Promise<void> {
        const dislike = await this.dislikeModel.findByPk(id);
        if (!dislike) {
            throw new Error('Dislike not found');
        }
        await dislike.destroy();
    }

    async getDislikeCount(recipeId: number): Promise<number> {
        return await this.dislikeModel.count({
            where: { recipeId }
        });
    }
}

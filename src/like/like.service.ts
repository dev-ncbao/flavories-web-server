import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './like.model';
import { CreateLikeDto } from './like.dto';

interface GetLikesOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
}

@Injectable()
export class LikeService {
    constructor(@InjectModel(Like) private likeModel: typeof Like) {}

    async getLikes(options: GetLikesOptions = {}): Promise<Like[]> {
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

        const likes = await this.likeModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        return likes;
    }

    async getLikeById(id: number): Promise<Like> {
        return await this.likeModel.findByPk(id);
    }

    async getLikeByUserAndRecipe(userId: number, recipeId: number): Promise<Like> {
        return await this.likeModel.findOne({
            where: { userId, recipeId }
        });
    }

    async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
        // Check if user already liked this recipe
        const existing = await this.getLikeByUserAndRecipe(
            createLikeDto.userId,
            createLikeDto.recipeId
        );

        if (existing) {
            throw new Error('User has already liked this recipe');
        }

        return await this.likeModel.create({
            userId: createLikeDto.userId,
            recipeId: createLikeDto.recipeId
        });
    }

    async deleteLike(id: number): Promise<void> {
        const like = await this.likeModel.findByPk(id);
        if (!like) {
            throw new Error('Like not found');
        }
        await like.destroy();
    }

    async getLikeCount(recipeId: number): Promise<number> {
        return await this.likeModel.count({
            where: { recipeId }
        });
    }
}

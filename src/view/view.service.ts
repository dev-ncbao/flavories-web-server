import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { View } from './view.model';
import { CreateViewDto } from './view.dto';

interface GetViewsOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
}

@Injectable()
export class ViewService {
    constructor(@InjectModel(View) private viewModel: typeof View) {}

    async getViews(options: GetViewsOptions = {}): Promise<View[]> {
        const { limit = 10, page = 1, recipeId, userId } = options;

        const offset = (page - 1) * limit;

        const whereClause: Record<string, number> = {};

        if (recipeId !== undefined) {
            whereClause.recipeId = recipeId;
        }

        if (userId !== undefined) {
            whereClause.userId = userId;
        }

        const views = await this.viewModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        return views;
    }

    async getViewById(id: number): Promise<View> {
        return await this.viewModel.findByPk(id);
    }

    async createView(createViewDto: CreateViewDto): Promise<View> {
        return await this.viewModel.create({
            userId: createViewDto.userId || null,
            recipeId: createViewDto.recipeId
        });
    }

    async deleteView(id: number): Promise<void> {
        const view = await this.viewModel.findByPk(id);
        if (!view) {
            throw new Error('View not found');
        }
        await view.destroy();
    }

    async getViewCount(recipeId: number): Promise<number> {
        return await this.viewModel.count({
            where: { recipeId }
        });
    }

    async getUniqueViewCount(recipeId: number): Promise<number> {
        const result = await this.viewModel.findAll({
            where: { recipeId },
            attributes: ['userId'],
            group: ['userId'],
            raw: true
        });

        return result.length;
    }
}

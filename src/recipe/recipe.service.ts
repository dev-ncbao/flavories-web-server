import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { Op } from 'sequelize';

interface GetRecipesOptions {
    limit?: number;
    page?: number;
    startDate?: Date;
    endDate?: Date;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe) private recipeModel: typeof Recipe) {}

    /**
     * Generic method to fetch recipes with pagination, filtering, and sorting
     */
    async getRecipes(options: GetRecipesOptions = {}): Promise<Recipe[]> {
        const {
            limit = 10,
            page = 1,
            startDate,
            endDate,
            sortBy = 'trendingScore',
            sortOrder = 'DESC'
        } = options;

        // Calculate offset from page number
        const offset = (page - 1) * limit;

        // Build where clause for date filtering
        const whereClause: {
            createdAt?: {
                [Op.gte]?: Date;
                [Op.lte]?: Date;
            };
        } = {};

        if (startDate || endDate) {
            whereClause.createdAt = {};
            if (startDate) {
                whereClause.createdAt[Op.gte] = startDate;
            }
            if (endDate) {
                whereClause.createdAt[Op.lte] = endDate;
            }
        }

        const recipes = await this.recipeModel.findAll({
            where: whereClause,
            order: [[sortBy, sortOrder]],
            limit: limit,
            offset: offset
        });

        return recipes;
    }

    async findOne(id: number): Promise<Recipe | null> {
        return this.recipeModel.findByPk(id);
    }
}

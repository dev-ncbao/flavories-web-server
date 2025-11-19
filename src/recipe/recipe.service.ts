import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './recipe.model';
import { Op } from 'sequelize';

interface GetTrendingRecipesOptions {
    limit?: number;
    page?: number;
    startDate?: Date;
    endDate?: Date;
    sortBy?: 'name' | 'trendingScore' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

interface GetNewRecipesOptions {
    limit?: number;
    page?: number;
    startDate?: Date;
    endDate?: Date;
    sortBy?: 'name' | 'createdAt';
    sortOrder?: 'ASC' | 'DESC';
}

@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe) private recipeModel: typeof Recipe) {}

    async getAllRecipe(): Promise<Recipe[]> {
        const recipes = await this.recipeModel.findAll();
        return recipes;
    }

    async getTrendingRecipes(options: GetTrendingRecipesOptions = {}): Promise<Recipe[]> {
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

    async getTrendingRecipesThisMonth(limit: number = 10): Promise<Recipe[]> {
        // Get the start of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const recipes = await this.recipeModel.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth
                }
            },
            order: [['trendingScore', 'DESC']],
            limit: limit
        });
        return recipes;
    }

    async getNewRecipesThisMonth(limit: number = 10): Promise<Recipe[]> {
        // Get the start of the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const recipes = await this.recipeModel.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth
                }
            },
            order: [['createdAt', 'DESC']],
            limit: limit
        });
        return recipes;
    }

    async getNewRecipes(options: GetNewRecipesOptions = {}): Promise<Recipe[]> {
        const {
            limit = 10,
            page = 1,
            startDate,
            endDate,
            sortBy = 'createdAt',
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

    async getMostPopularRecipes(limit: number = 10): Promise<Recipe[]> {
        const recipes = await this.recipeModel.findAll({
            order: [['trendingScore', 'DESC']],
            limit: limit
        });
        return recipes;
    }
}

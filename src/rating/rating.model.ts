import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Rating extends Model {
    @Column
    userId: number;
    getUserId(): number {
        return this.getDataValue('userId') as number;
    }

    @Column
    recipeId: number;
    getRecipeId(): number {
        return this.getDataValue('recipeId') as number;
    }

    @Column
    rating: number;
    getRating(): number {
        const value = this.getDataValue('rating') as string | number;
        return parseFloat(String(value));
    }

    getCreatedAt(): Date {
        return this.getDataValue('createdAt') as Date;
    }

    getUpdatedAt(): Date {
        return this.getDataValue('updatedAt') as Date;
    }
}

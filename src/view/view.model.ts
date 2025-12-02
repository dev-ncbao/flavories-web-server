import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'recipe_views', timestamps: true })
export class View extends Model {
    @Column
    userId: number;
    getUserId(): number | null {
        return this.getDataValue('userId') as number | null;
    }

    @Column
    recipeId: number;
    getRecipeId(): number {
        return this.getDataValue('recipeId') as number;
    }

    getCreatedAt(): Date {
        return this.getDataValue('createdAt') as Date;
    }

    getUpdatedAt(): Date {
        return this.getDataValue('updatedAt') as Date;
    }
}

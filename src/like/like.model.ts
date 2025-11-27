import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Like extends Model {
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

    getCreatedAt(): Date {
        return this.getDataValue('createdAt') as Date;
    }

    getUpdatedAt(): Date {
        return this.getDataValue('updatedAt') as Date;
    }
}

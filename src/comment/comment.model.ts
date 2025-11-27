import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Comment extends Model {
    @Column
    content: string;
    getContent(): string | null {
        return this.getDataValue('content') as string | null;
    }

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
    parentId: number;
    getParentId(): number | null {
        return this.getDataValue('parentId') as number | null;
    }

    @Column
    likeCount: number;
    getLikeCount(): number {
        return this.getDataValue('likeCount') as number;
    }

    getCreatedAt(): Date {
        return this.getDataValue('createdAt') as Date;
    }

    getUpdatedAt(): Date {
        return this.getDataValue('updatedAt') as Date;
    }
}

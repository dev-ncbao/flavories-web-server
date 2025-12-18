import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'recipe_media', timestamps: true })
export class RecipeMedia extends Model {
    @Column
    recipeId: number;
    getRecipeId(): number | null {
        return this.getDataValue('recipeId') as number | null;
    }

    @Column
    mediaTypeId: number;
    getMediaTypeId(): number | null {
        return this.getDataValue('mediaTypeId') as number | null;
    }

    @Column
    url: string;
    getUrl(): string | null {
        return this.getDataValue('url') as string | null;
    }

    @Column
    altText: string;
    getAltText(): string | null {
        return this.getDataValue('altText') as string | null;
    }

    @Column
    sortOrder: number;
    getSortOrder(): number | null {
        return this.getDataValue('sortOrder') as number | null;
    }
}

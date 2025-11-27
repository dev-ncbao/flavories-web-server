import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'recipe_ingredients', timestamps: true })
export class RecipeIngredient extends Model {
  @Column
  recipeId: number;
  getRecipeId(): number | null {
    return this.getDataValue('recipeId') as number | null;
  }

  @Column
  ingredientId: number;
  getIngredientId(): number | null {
    return this.getDataValue('ingredientId') as number | null;
  }
}

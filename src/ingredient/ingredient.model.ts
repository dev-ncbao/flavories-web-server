import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ingredients', timestamps: true })
export class Ingredient extends Model {
  @Column
  name: string;
  getName(): string | null {
    return this.getDataValue('name') as string | null;
  }
}

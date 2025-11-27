import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'genders', timestamps: true })
export class Gender extends Model {
  @Column
  name: string;
  getName(): string | null {
    return this.getDataValue('name') as string | null;
  }
}

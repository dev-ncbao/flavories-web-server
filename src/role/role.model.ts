import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model {
  @Column
  name: string;
  getName(): string | null {
    return this.getDataValue('name') as string | null;
  }
}

import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ingredients', timestamps: true })
export class Ingredient extends Model {
    @Column
    name: string;
    getName(): string | null {
        return this.getDataValue('name') as string | null;
    }

    @Column
    unitId: number;
    getUnitId(): number | null {
        return this.getDataValue('unitId') as number | null;
    }
}

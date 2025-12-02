import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'units', timestamps: true })
export class Unit extends Model {
    @Column
    name: string;
    getName(): string | null {
        return this.getDataValue('name') as string | null;
    }

    @Column
    abbreviation: string;
    getAbbreviation(): string | null {
        return this.getDataValue('abbreviation') as string | null;
    }

    getId(): number {
        return this.getDataValue('id') as number;
    }
}

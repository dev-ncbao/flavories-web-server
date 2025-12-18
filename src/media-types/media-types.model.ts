import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'media_types', timestamps: true })
export class MediaTypes extends Model {
    @Column
    name: string;
    getName(): string | null {
        return this.getDataValue('name') as string | null;
    }

    @Column
    description: string;
    getDescription(): string | null {
        return this.getDataValue('description') as string | null;
    }
}

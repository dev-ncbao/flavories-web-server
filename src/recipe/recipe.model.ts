import { Column, /* DataType, */ Model, Table } from 'sequelize-typescript';

@Table
export class Recipe extends Model {
    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('name') as string | null;
        },
    }) */
    name: string;
    getName(): string | null {
        return this.getDataValue('name') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('description') as string | null;
        },
    }) */
    description: string;
    getDescription(): string | null {
        return this.getDataValue('description') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        allowNull: true,
        get() {
            return this.getDataValue('image') as string | null;
        },
    }) */
    image: string;
    getImage(): string | null {
        return this.getDataValue('image') as string | null;
    }
}

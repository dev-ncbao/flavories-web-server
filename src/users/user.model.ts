import { Column, /* DataType, */ Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column /* ({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        get() {
            return this.getDataValue('email') as string | null;
        },
    }) */
    email: string;
    getEmail(): string | null {
        return this.getDataValue('email') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        get() {
            return this.getDataValue('username') as string | null;
        },
    }) */
    username: string;
    getUsername(): string | null {
        return this.getDataValue('username') as string | null;
    }

    @Column /* ({
        type: DataType.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('password') as string | null;
        },
    }) */
    password: string;
    getPassword(): string | null {
        return this.getDataValue('password') as string | null;
    }
}

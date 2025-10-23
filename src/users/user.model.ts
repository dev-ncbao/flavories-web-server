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
    passwordHashed: string;
    getPasswordHashed(): string | null {
        return this.getDataValue('passwordHashed') as string | null;
    }

    @Column
    firstName: string;
    getFirstName(): string | null {
        return this.getDataValue('firstName') as string | null;
    }

    @Column
    lastName: string;
    getLastName(): string | null {
        return this.getDataValue('lastName') as string | null;
    }

    @Column
    gender: number;
    getGender(): number | null {
        return this.getDataValue('gender') as number | null;
    }

    @Column
    avatarUrl: string;
    getAvatarUrl(): string | null {
        return this.getDataValue('avatarUrl') as string | null;
    }

    @Column
    bio: string;
    getBio(): string | null {
        return this.getDataValue('bio') as string | null;
    }
}

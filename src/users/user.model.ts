import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    userId: number;

    @AllowNull(true)
    @Column({ type: DataType.INTEGER })
    genderId: number | null;

    @AllowNull(true)
    @Column({ type: DataType.INTEGER })
    roleId: number | null;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    firstName: string;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    lastName: string;

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING(255) })
    email: string;

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING(255) })
    username: string;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    password: string;

    @AllowNull(true)
    @Column({ type: DataType.TEXT })
    avatarUrl: string | null;

    @AllowNull(true)
    @Column({ type: DataType.TEXT })
    bio: string | null;
}

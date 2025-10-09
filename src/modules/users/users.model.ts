import { ApiProperty } from '@nestjs/swagger';
import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
    @Column
    @ApiProperty()
    username: string;

    @Column
    @ApiProperty()
    password: string;

    @Column
    @ApiProperty()
    email: string;

    @Default(false)
    @Column
    isDeleted: boolean;
}

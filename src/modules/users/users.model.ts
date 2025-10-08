import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

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
}

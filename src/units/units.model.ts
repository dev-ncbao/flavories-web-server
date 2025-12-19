'use strict';

import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'units',
    timestamps: true
})
export class Unit extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    unitId: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    abbreviation: string | null;
}


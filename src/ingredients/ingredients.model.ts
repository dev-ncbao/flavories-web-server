'use strict';

import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { Unit } from 'src/units/units.model';

@Table({
    tableName: 'ingredients',
    timestamps: true
})
export class Ingredient extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    ingredientId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    @ForeignKey(() => Unit)
    unitId: number | null;

    @BelongsTo(() => Unit)
    unit: Unit;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    name: string;
}

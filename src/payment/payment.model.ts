'use strict';

import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import { Course } from '../courses/courses.model';
import { User } from '../users/user.model';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model<Payment> {
    @PrimaryKey
    @AutoIncrement
    @Column({ type: DataType.INTEGER })
    paymentId: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    @ForeignKey(() => Course)
    courseId: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    @ForeignKey(() => User)
    userId: number;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0,
        get() {
            const rawValue = this.getDataValue('amount') as string;
            return rawValue ? Number(rawValue) : 0;
        }
    })
    amount: number;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    orderCode: number;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    paymentLinkId: string;

    @AllowNull(false)
    @Column({ type: DataType.DATE })
    expiredAt: Date;

    @AllowNull(false)
    @Column({ type: DataType.TEXT })
    status: string;
}


'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Course } from '../courses/courses.model';
import { Payment } from './payment.model';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Course, Payment]),
        UserModule
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
    exports: [PaymentService]
})
export class PaymentModule {}


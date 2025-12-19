'use strict';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { Unit } from './units.model';

@Module({
    imports: [SequelizeModule.forFeature([Unit])],
    controllers: [UnitsController],
    providers: [UnitsService],
    exports: [UnitsService]
})
export class UnitsModule {}


'use strict';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Unit } from './units.model';
import { CreateUnitDto, UpdateUnitDto } from './units.dto';

@Injectable()
export class UnitsService {
    constructor(
        @InjectModel(Unit)
        private readonly unitModel: typeof Unit
    ) {}

    async create(dto: CreateUnitDto): Promise<Unit> {
        return this.unitModel.create({ ...dto });
    }

    async findAll(): Promise<Unit[]> {
        return this.unitModel.findAll();
    }

    async findOne(unitId: number): Promise<Unit> {
        const unit = await this.unitModel.findByPk(unitId);
        if (!unit) {
            throw new NotFoundException('Unit not found');
        }
        return unit;
    }

    async update(unitId: number, dto: UpdateUnitDto): Promise<Unit> {
        const unit = await this.findOne(unitId);
        await unit.update({ ...dto });
        return unit;
    }

    async remove(unitId: number): Promise<void> {
        const unit = await this.findOne(unitId);
        await unit.destroy();
    }
}


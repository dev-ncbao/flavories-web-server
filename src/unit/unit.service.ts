import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Unit } from './unit.model';

@Injectable()
export class UnitService {
    constructor(
        @InjectModel(Unit)
        private unitModel: typeof Unit
    ) {}

    async findAll(): Promise<Unit[]> {
        return await this.unitModel.findAll();
    }
}

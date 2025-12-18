import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './gender.model';
import { GenderDto } from './gender.dto';

@Injectable()
export class GenderService {
    constructor(
        @InjectModel(Gender)
        private genderModel: typeof Gender
    ) {}

    async findAll(): Promise<Gender[]> {
        return this.genderModel.findAll();
    }

    async findOne(id: number): Promise<Gender | null> {
        return this.genderModel.findByPk(id);
    }

    async create(dto: GenderDto): Promise<Gender> {
        return this.genderModel.create(dto as any);
    }

    async update(id: number, dto: GenderDto): Promise<[number, Gender[]]> {
        return this.genderModel.update(dto, { where: { id }, returning: true });
    }

    async remove(id: number): Promise<number> {
        return this.genderModel.destroy({ where: { id } });
    }
}

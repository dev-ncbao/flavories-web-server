import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './cats.model';
import { CreateCatDto } from './cats.dto';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat) private catModel: typeof Cat) {}

    async findAll(): Promise<Cat[]> {
        return this.catModel.findAll();
    }

    async findOne(id: number): Promise<Cat> {
        return this.catModel.findOne({
            where: {
                id: id,
            },
        });
    }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        return this.catModel.create({ ...createCatDto });
    }
}

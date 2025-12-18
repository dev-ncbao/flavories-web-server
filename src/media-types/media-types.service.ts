import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MediaTypes } from './media-types.model';
import { MediaTypesDto } from './media-types.dto';

@Injectable()
export class MediaTypesService {
    constructor(
        @InjectModel(MediaTypes)
        private mediaTypesModel: typeof MediaTypes
    ) {}

    async findAll(): Promise<MediaTypes[]> {
        return this.mediaTypesModel.findAll();
    }

    async findOne(id: number): Promise<MediaTypes | null> {
        return this.mediaTypesModel.findByPk(id);
    }

    async create(dto: MediaTypesDto): Promise<MediaTypes> {
        return this.mediaTypesModel.create(dto as any);
    }

    async update(
        id: number,
        dto: MediaTypesDto
    ): Promise<[number, MediaTypes[]]> {
        return this.mediaTypesModel.update(dto, {
            where: { id },
            returning: true
        });
    }

    async remove(id: number): Promise<number> {
        return this.mediaTypesModel.destroy({ where: { id } });
    }
}

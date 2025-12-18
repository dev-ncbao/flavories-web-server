import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role
    ) {}

    async findAll(): Promise<Role[]> {
        return this.roleModel.findAll();
    }

    async findOne(id: number): Promise<Role | null> {
        return this.roleModel.findByPk(id);
    }

    async create(dto: RoleDto): Promise<Role> {
        return this.roleModel.create(dto as any);
    }

    async update(id: number, dto: RoleDto): Promise<[number, Role[]]> {
        return this.roleModel.update(dto, { where: { id }, returning: true });
    }

    async remove(id: number): Promise<number> {
        return this.roleModel.destroy({ where: { id } });
    }
}

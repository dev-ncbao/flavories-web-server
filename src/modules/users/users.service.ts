import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: number): Promise<User> {
        return this.userModel.findOne({ where: { id: id } });
    }

    create(user: CreateUserDto): Promise<User> {
        debugger;
        return this.userModel.create({ ...user });
    }

    update(id: number, user: UpdateUserDto) {
        return this.userModel.update(user, {
            where: {
                id: id
            }
        });
    }

    delete(id: number) {
        return this.userModel.destroy({
            where: {
                id: id
            }
        });
    }
}

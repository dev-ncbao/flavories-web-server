import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    private users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findOne(id: number) {
        return this.users.find((user) => user.id === id);
    }

    create(user: { id: number; name: string }) {
        this.users.push(user);
        return user;
    }

    update(id: number, name: string) {
        const user = this.findOne(id);
        if (user) {
            user.name = name;
        }
        return user;
    }

    delete(id: number) {
        this.users = this.users.filter((user) => user.id !== id);
        return { deleted: true };
    }
}

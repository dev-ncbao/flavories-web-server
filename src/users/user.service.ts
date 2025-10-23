import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async findOneByUsernameAndPassword(
        username: string,
        password: string
    ): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return null;
        }

        const isMatched = await bcrypt.compare(
            password,
            /* user.get('password') */ user?.getPasswordHashed()
        );

        return isMatched ? user : null;
    }

    async findOneByEmailAndPassword(
        email: string,
        password: string
    ): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return null;
        }

        const isMatched = await bcrypt.compare(
            password,
            /* user.get('password') */ user?.getPasswordHashed()
        );

        return isMatched ? user : null;
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            return null;
        }

        return user;
    }
}

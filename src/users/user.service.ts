import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async createUser(
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        password: string
    ): Promise<void> {
        await this.userModel.create({
            firstName,
            lastName,
            email,
            username,
            password: await bcrypt.hash(password, 10)
        });
    }

    async findOneByUsername(username: string): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                username: username
            }
        });

        if (!user) {
            return null;
        }

        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return null;
        }

        return user;
    }

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

        const isMatched = await bcrypt.compare(password, user.dataValues.password);

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

        const isMatched = await bcrypt.compare(password, user.dataValues.password);

        return isMatched ? user : null;
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                userId: id
            }
        });

        if (!user) {
            return null;
        }

        return user;
    }
}

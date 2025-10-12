import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async findOneByUsernameAndPassword(
        username: string,
        password: string,
    ): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                username: username,
            },
        });

        const isMatched = await bcrypt.compare(
            password,
            /* user.get('password') */ user.getPassword(),
        );

        return isMatched ? user : null;
    }
}

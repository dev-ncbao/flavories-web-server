import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { UserModule } from './modules/users/users.module';
import { User } from './modules/users/users.model';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'sa',
            password: '1111',
            database: 'flavories',
            autoLoadModels: true,
            synchronize: true
            // models: [User]
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

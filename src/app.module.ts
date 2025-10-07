import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'sa',
            password: '1111',
            database: 'flavories',
            models: []
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

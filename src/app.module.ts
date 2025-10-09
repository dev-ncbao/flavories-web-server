import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './cats/cats.module';

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
            // synchronize: true,
        }),
        CatsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

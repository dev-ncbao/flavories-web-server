import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './cats.model';

@Module({
    imports: [SequelizeModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule {}

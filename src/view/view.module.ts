import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { View } from './view.model';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';

@Module({
    imports: [SequelizeModule.forFeature([View])],
    controllers: [ViewController],
    providers: [ViewService],
    exports: [ViewService]
})
export class ViewModule {}

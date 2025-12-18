import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaTypes } from './media-types.model';
import { MediaTypesService } from './media-types.service';
import { MediaTypesController } from './media-types.controller';

@Module({
    imports: [SequelizeModule.forFeature([MediaTypes])],
    providers: [MediaTypesService],
    controllers: [MediaTypesController]
})
export class MediaTypesModule {}

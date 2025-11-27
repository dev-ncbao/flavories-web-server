import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dislike } from './dislike.model';
import { DislikeService } from './dislike.service';
import { DislikeController } from './dislike.controller';

@Module({
    imports: [SequelizeModule.forFeature([Dislike])],
    controllers: [DislikeController],
    providers: [DislikeService],
    exports: [DislikeService]
})
export class DislikeModule {}

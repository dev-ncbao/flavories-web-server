import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './like.model';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
    imports: [SequelizeModule.forFeature([Like])],
    controllers: [LikeController],
    providers: [LikeService],
    exports: [LikeService]
})
export class LikeModule {}

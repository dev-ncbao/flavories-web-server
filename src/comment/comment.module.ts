import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
    imports: [SequelizeModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService],
    exports: [CommentService]
})
export class CommentModule {}

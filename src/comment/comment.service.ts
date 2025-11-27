import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

interface GetCommentsOptions {
    limit?: number;
    page?: number;
    recipeId?: number;
    userId?: number;
    parentId?: number | null;
}

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

    async getComments(options: GetCommentsOptions = {}): Promise<Comment[]> {
        const {
            limit = 10,
            page = 1,
            recipeId,
            userId,
            parentId
        } = options;

        const offset = (page - 1) * limit;

        const whereClause: Record<string, number | null> = {};
        
        if (recipeId !== undefined) {
            whereClause.recipeId = recipeId;
        }
        
        if (userId !== undefined) {
            whereClause.userId = userId;
        }
        
        if (parentId !== undefined) {
            whereClause.parentId = parentId;
        }

        const comments = await this.commentModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        });

        return comments;
    }

    async getCommentById(id: number): Promise<Comment> {
        return await this.commentModel.findByPk(id);
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentModel.create({
            content: createCommentDto.content,
            userId: createCommentDto.userId,
            recipeId: createCommentDto.recipeId,
            parentId: createCommentDto.parentId || null,
            likeCount: 0
        });
    }

    async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentModel.findByPk(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        
        if (updateCommentDto.content !== undefined) {
            comment.content = updateCommentDto.content;
        }
        
        await comment.save();
        return comment;
    }

    async deleteComment(id: number): Promise<void> {
        const comment = await this.commentModel.findByPk(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        await comment.destroy();
    }

    async getReplies(parentId: number, limit: number = 10): Promise<Comment[]> {
        return await this.commentModel.findAll({
            where: { parentId },
            order: [['createdAt', 'ASC']],
            limit: limit
        });
    }
}

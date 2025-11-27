import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from './comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {}

    @Get()
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of comments per page (default: 10)'
    })
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number (default: 1)'
    })
    @ApiQuery({
        name: 'recipeId',
        required: false,
        type: Number,
        description: 'Filter by recipe ID'
    })
    @ApiQuery({
        name: 'userId',
        required: false,
        type: Number,
        description: 'Filter by user ID'
    })
    @ApiQuery({
        name: 'parentId',
        required: false,
        type: Number,
        description: 'Filter by parent comment ID (null for top-level)'
    })
    async getComments(
        @Query('limit') limit?: string,
        @Query('page') page?: string,
        @Query('recipeId') recipeId?: string,
        @Query('userId') userId?: string,
        @Query('parentId') parentId?: string
    ): Promise<CommentDto[]> {
        const options = {
            limit: limit ? parseInt(limit, 10) : undefined,
            page: page ? parseInt(page, 10) : undefined,
            recipeId: recipeId ? parseInt(recipeId, 10) : undefined,
            userId: userId ? parseInt(userId, 10) : undefined,
            parentId: parentId
                ? parentId === 'null'
                    ? null
                    : parseInt(parentId, 10)
                : undefined
        };

        const comments = await this.commentService.getComments(options);

        return comments.map((comment) => ({
            id: Number(comment.id),
            content: comment.getContent(),
            userId: comment.getUserId(),
            recipeId: comment.getRecipeId(),
            parentId: comment.getParentId(),
            likeCount: comment.getLikeCount(),
            createdAt: comment.getCreatedAt(),
            updatedAt: comment.getUpdatedAt()
        }));
    }

    @Get(':id')
    async getCommentById(@Param('id') id: string): Promise<CommentDto> {
        const comment = await this.commentService.getCommentById(
            parseInt(id, 10)
        );

        if (!comment) {
            throw new Error('Comment not found');
        }

        return {
            id: Number(comment.id),
            content: comment.getContent(),
            userId: comment.getUserId(),
            recipeId: comment.getRecipeId(),
            parentId: comment.getParentId(),
            likeCount: comment.getLikeCount(),
            createdAt: comment.getCreatedAt(),
            updatedAt: comment.getUpdatedAt()
        };
    }

    @Get(':id/replies')
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of replies (default: 10)'
    })
    async getReplies(
        @Param('id') id: string,
        @Query('limit') limit?: string
    ): Promise<CommentDto[]> {
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        const replies = await this.commentService.getReplies(
            parseInt(id, 10),
            limitNumber
        );

        return replies.map((comment) => ({
            id: Number(comment.id),
            content: comment.getContent(),
            userId: comment.getUserId(),
            recipeId: comment.getRecipeId(),
            parentId: comment.getParentId(),
            likeCount: comment.getLikeCount(),
            createdAt: comment.getCreatedAt(),
            updatedAt: comment.getUpdatedAt()
        }));
    }

    @Post()
    async createComment(
        @Body() createCommentDto: CreateCommentDto
    ): Promise<CommentDto> {
        const comment =
            await this.commentService.createComment(createCommentDto);

        return {
            id: Number(comment.id),
            content: comment.getContent(),
            userId: comment.getUserId(),
            recipeId: comment.getRecipeId(),
            parentId: comment.getParentId(),
            likeCount: comment.getLikeCount(),
            createdAt: comment.getCreatedAt(),
            updatedAt: comment.getUpdatedAt()
        };
    }

    @Put(':id')
    async updateComment(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto
    ): Promise<CommentDto> {
        const comment = await this.commentService.updateComment(
            parseInt(id, 10),
            updateCommentDto
        );

        return {
            id: Number(comment.id),
            content: comment.getContent(),
            userId: comment.getUserId(),
            recipeId: comment.getRecipeId(),
            parentId: comment.getParentId(),
            likeCount: comment.getLikeCount(),
            createdAt: comment.getCreatedAt(),
            updatedAt: comment.getUpdatedAt()
        };
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: string): Promise<{ message: string }> {
        await this.commentService.deleteComment(parseInt(id, 10));
        return { message: 'Comment deleted successfully' };
    }
}

export class CommentDto {
    id: number;
    content: string;
    userId: number;
    recipeId: number;
    parentId: number | null;
    likeCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateCommentDto {
    content: string;
    userId: number;
    recipeId: number;
    parentId?: number;
}

export class UpdateCommentDto {
    content?: string;
}

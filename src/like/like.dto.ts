export class LikeDto {
    id: number;
    userId: number;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateLikeDto {
    userId: number;
    recipeId: number;
}

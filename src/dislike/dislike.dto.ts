export class DislikeDto {
    id: number;
    userId: number;
    recipeId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateDislikeDto {
    userId: number;
    recipeId: number;
}

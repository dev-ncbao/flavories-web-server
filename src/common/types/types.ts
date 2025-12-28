export enum PaymentStatus {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    UNDERPAID = 'UNDERPAID',
    PAID = 'PAID',
    EXPIRED = 'EXPIRED',
    PROCESSING = 'PROCESSING',
    FAILED = 'FAILED'
}

/**
 * Gender enum matching database seeder values
 */
export enum Gender {
    MALE = 1,
    FEMALE = 2
}

/**
 * Role enum matching database seeder values
 */
export enum Role {
    ADMIN = 1,
    INSTRUCTOR = 2,
    MEMBER = 3
}

/**
 * Reaction Type enum matching database seeder values
 */
export enum ReactionType {
    LIKE = 1,
    DISLIKE = 2
}

/**
 * Sequelize query utilities
 */

/**
 * Standard user attributes for includes
 */
export const USER_ATTRIBUTES = [
    'userId',
    'username',
    'avatarUrl',
    'firstName',
    'lastName'
] as const;

/**
 * Standard user attributes for detailed views
 */
export const USER_DETAILED_ATTRIBUTES = [
    'userId',
    'username',
    'avatarUrl',
    'firstName',
    'lastName',
    'email',
    'bio'
] as const;

/**
 * Get start of current month in UTC
 */
export function getStartOfCurrentMonth(): Date {
    const now = new Date();
    return new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0)
    );
}


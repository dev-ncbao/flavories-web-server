/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/**
 * Enum utility functions
 */
import { Gender, Role, ReactionType } from '../types/types';

/**
 * Get gender name by ID
 */
export function getGenderName(genderId: number | null): string | null {
    if (genderId === null) {
        return null;
    }
    
    switch (genderId) {
        case Gender.MALE:
            return 'Male';
        case Gender.FEMALE:
            return 'Female';
        default:
            return null;
    }
}

/**
 * Get role name by ID
 */
export function getRoleName(roleId: number | null): string | null {
    if (roleId === null) {
        return null;
    }
    
    switch (roleId) {
        case Role.ADMIN:
            return 'Admin';
        case Role.INSTRUCTOR:
            return 'Instructor';
        case Role.MEMBER:
            return 'Member';
        default:
            return null;
    }
}

/**
 * Get reaction type name by ID
 */
export function getReactionTypeName(reactionTypeId: number): string | null {
    switch (reactionTypeId) {
        case ReactionType.LIKE:
            return 'Like';
        case ReactionType.DISLIKE:
            return 'Dislike';
        default:
            return null;
    }
}

/**
 * Check if a role ID is admin
 */
export function isAdminRole(roleId: number | null): boolean {
    return roleId === Role.ADMIN;
}


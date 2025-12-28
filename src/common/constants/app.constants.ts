import { Role } from '../types/types';

/**
 * Application-wide constants
 */
export const APP_CONSTANTS = {
    // Authentication
    BCRYPT_SALT_ROUNDS: 10,
    JWT_EXPIRES_IN: '2 days',
    
    // Roles (using enum for type safety)
    ADMIN_ROLE_ID: Role.ADMIN,
    
    // Default values
    DEFAULT_PAGINATION_LIMIT: 10,
    DEFAULT_PAGINATION_PAGE: 1,
    DEFAULT_TOP_LIMIT: 20,
    
    // Payment
    PAYMENT_EXPIRY_DAYS: 2,
    
    // Date calculations
    MILLISECONDS_PER_DAY: 24 * 60 * 60 * 1000
} as const;


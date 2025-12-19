import { Request } from 'express';

export interface AuthUser {
    userId: number;
}

export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}

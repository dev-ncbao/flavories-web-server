import { Request } from 'express';

export interface AuthUser {
    id: number;
}

export interface AuthenticatedRequest extends Request {
    user: AuthUser;
}

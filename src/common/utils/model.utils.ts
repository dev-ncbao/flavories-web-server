/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/**
 * Model utility functions
 */

import { Model } from 'sequelize-typescript';

/**
 * Safely get model property value
 * Prefers direct property access over dataValues
 */
export function getModelValue<T>(
    model: Model<any, any>,
    property: string
): T | null {
    if (model[property] !== undefined) {
        return model[property] as T;
    }
    if (model.dataValues?.[property] !== undefined) {
        return model.dataValues[property] as T;
    }
    return null;
}

/**
 * Convert model to plain object, preferring direct properties
 */
export function modelToPlainObject(
    model: Model<any, any>
): Record<string, any> {
    if (!model) {
        return {};
    }

    // If model has toJSON method, use it
    if (typeof model.toJSON === 'function') {
        return model.toJSON();
    }

    // Prefer direct properties, fallback to dataValues
    return { ...model.dataValues, ...model } as Record<string, any>;
}

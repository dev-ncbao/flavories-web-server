'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipe_reactions',
            [
                { reactionTypeId: 1, recipeId: 1, userId: 4, createdAt: now, updatedAt: now },
                { reactionTypeId: 2, recipeId: 2, userId: 5, createdAt: now, updatedAt: now },
                { reactionTypeId: 1, recipeId: 3, userId: 4, createdAt: now, updatedAt: now },
                { reactionTypeId: 2, recipeId: 4, userId: 5, createdAt: now, updatedAt: now },
                { reactionTypeId: 1, recipeId: 5, userId: 4, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_reaction_mappings', null, {});
    }
};


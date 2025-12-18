'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipe_comment_user_mappings',
            [
                { recipeId: 1, commentId: 1, createdAt: now, updatedAt: now },
                { recipeId: 2, commentId: 2, createdAt: now, updatedAt: now },
                { recipeId: 3, commentId: 3, createdAt: now, updatedAt: now },
                { recipeId: 4, commentId: 4, createdAt: now, updatedAt: now },
                { recipeId: 5, commentId: 5, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_comment_user_mappings', null, {});
    }
};



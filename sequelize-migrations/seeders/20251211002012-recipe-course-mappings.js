'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipe_course_mappings',
            [
                { recipeId: 1, courseId: 1, createdAt: now, updatedAt: now },
                { recipeId: 2, courseId: 1, createdAt: now, updatedAt: now },
                { recipeId: 5, courseId: 2, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_course_mappings', null, {});
    }
};


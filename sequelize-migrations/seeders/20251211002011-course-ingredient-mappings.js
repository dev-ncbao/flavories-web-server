'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'course_ingredients',
            [
                { ingredientId: 1, courseId: 1, amount: 300.0, createdAt: now, updatedAt: now },
                { ingredientId: 3, courseId: 1, amount: 15.0, createdAt: now, updatedAt: now },
                { ingredientId: 5, courseId: 1, amount: 1.0, createdAt: now, updatedAt: now },

                { ingredientId: 2, courseId: 2, amount: 400.0, createdAt: now, updatedAt: now },
                { ingredientId: 7, courseId: 2, amount: 2.0, createdAt: now, updatedAt: now },

                { ingredientId: 4, courseId: 3, amount: 1.0, createdAt: now, updatedAt: now },
                { ingredientId: 8, courseId: 3, amount: 4.0, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('course_ingredient_mappings', null, {});
    }
};


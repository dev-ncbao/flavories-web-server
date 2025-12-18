'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'course_ratings',
            [
                { courseId: 1, userId: 4, rating: 5, createdAt: now, updatedAt: now },
                { courseId: 2, userId: 5, rating: 4, createdAt: now, updatedAt: now },
                { courseId: 3, userId: 6, rating: 3, createdAt: now, updatedAt: now },
                { courseId: 2, userId: 4, rating: 2, createdAt: now, updatedAt: now },
                { courseId: 1, userId: 5, rating: 1, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('course_ratings', null, {});
    }
};



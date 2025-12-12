'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'payments',
            [
                { courseId: 1, userId: 4, amount: 29.0, createdAt: now, updatedAt: now },
                { courseId: 1, userId: 5, amount: 29.0, createdAt: now, updatedAt: now },
                { courseId: 2, userId: 4, amount: 35.0, createdAt: now, updatedAt: now },
                { courseId: 3, userId: 5, amount: 40.0, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('payments', null, {});
    }
};


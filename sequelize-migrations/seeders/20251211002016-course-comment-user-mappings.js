'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'course_comment_user_mappings',
            [
                { courseId: 2, commentId: 6, createdAt: now, updatedAt: now },
                { courseId: 3, commentId: 7, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('course_comment_user_mappings', null, {});
    }
};



'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('course_comment_user_mappings', {
            courseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'courses',
                    key: 'courseId'
                },
                allowNull: false
            },
            commentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'comments',
                    key: 'commentId'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('course_comment_user_mappings');
    }
};

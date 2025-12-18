'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('course_ratings', {
            courseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'courses',
                    key: 'courseId'
                },
                allowNull: false,
                primaryKey: true
            },
            userId: {
                references: {
                    model: 'users',
                    key: 'userId'
                },
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            rating: {
                type: Sequelize.DECIMAL(2, 1),
                allowNull: false,
                comment: 'Rating value from 0.0 to 5.0'
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
        await queryInterface.dropTable('course_ratings');
    }
};

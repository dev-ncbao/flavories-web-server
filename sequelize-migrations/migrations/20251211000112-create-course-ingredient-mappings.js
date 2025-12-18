'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('course_ingredient_mappings', {
            ingredientId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ingredients',
                    key: 'ingredientId'
                },
                allowNull: false,
                primaryKey: true
            },
            courseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'courses',
                    key: 'courseId'
                },
                allowNull: false,
                primaryKey: true
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
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
        await queryInterface.dropTable('course_ingredient_mappings');
    }
};


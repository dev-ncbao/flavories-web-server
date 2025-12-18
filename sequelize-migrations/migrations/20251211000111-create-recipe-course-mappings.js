'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_course_mappings', {
            recipeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'recipes',
                    key: 'recipeId'
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
        await queryInterface.dropTable('recipe_course_mappings');
    }
};


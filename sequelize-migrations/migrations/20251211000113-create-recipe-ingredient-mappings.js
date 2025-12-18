'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_ingredient_mappings', {
            ingredientId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ingredients',
                    key: 'ingredientId'
                },
                allowNull: false,
                primaryKey: true
            },
            recipeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'recipes',
                    key: 'recipeId'
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
        await queryInterface.dropTable('recipe_ingredient_mappings');
    }
};


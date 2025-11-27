'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_ingredients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            recipeId: {
                type: Sequelize.INTEGER
            },
            ingredientId: {
                type: Sequelize.INTEGER
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

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_ingredients AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipe_ingredients');
    }
};

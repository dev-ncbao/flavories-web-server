'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_ratings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'User who rated the recipe'
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Recipe being rated'
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

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_ratings AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipe_ratings');
    }
};

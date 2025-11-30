'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_dislikes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'User who disliked the recipe'
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Recipe being disliked'
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
            'ALTER TABLE recipe_dislikes AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipe_dislikes');
    }
};

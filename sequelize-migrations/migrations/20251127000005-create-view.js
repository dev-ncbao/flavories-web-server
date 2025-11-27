'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe-views', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: 'User who viewed the recipe (null for anonymous views)'
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Recipe being viewed'
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
            'ALTER TABLE recipe-views AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipe-views');
    }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
                comment: 'Comment content'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'User who wrote the comment'
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Recipe being commented on'
            },
            parentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: 'Parent comment ID for nested replies (null for top-level comments)'
            },
            likeCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
                comment: 'Number of likes on this comment'
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
        await queryInterface.dropTable('comments');
    }
};

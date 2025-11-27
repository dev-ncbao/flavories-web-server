'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            thumbnail: {
                type: Sequelize.STRING
            },
            rating: {
                type: Sequelize.DECIMAL(2, 1),
                defaultValue: 0.0,
                allowNull: false,
                comment: 'Rating from 0.0 to 5.0 stars'
            },
            likeCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            dislikeCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            viewCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            commentCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            trendingScore: {
                type: Sequelize.DECIMAL(10, 2),
                defaultValue: 0.0,
                allowNull: false,
                comment:
                    'Calculated trending score based on rating, likes, views, comments'
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
            'ALTER TABLE recipes AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipes');
    }
};

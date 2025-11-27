'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('recipe_media', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'ID of the recipe this media belongs to'
            },
            mediaTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'ID referencing media_types table (type of media)'
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'URL to the media file'
            },
            altText: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Optional alt text or caption for the media'
            },
            sortOrder: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: 'Optional ordering index for multiple media items'
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
        // reset auto-increment to 1 before dropping (keeps behavior consistent with seeders)
        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_media AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('recipe_media');
    }
};

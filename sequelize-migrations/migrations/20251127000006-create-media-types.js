'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('media_types', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'Media type name, e.g. image, video, gif'
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Optional description of the media type'
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
            'ALTER TABLE media_types AUTO_INCREMENT = 1;'
        );
        await queryInterface.dropTable('media_types');
    }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('units', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'Unit name (e.g., cup, tablespoon, gram)'
            },
            abbreviation: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Unit abbreviation (e.g., c, tbsp, g)'
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
        await queryInterface.sequelize.query('ALTER TABLE units AUTO_INCREMENT = 1;');
        await queryInterface.dropTable('units');
    }
};

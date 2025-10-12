'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        await queryInterface.changeColumn('users', 'email', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });

        await queryInterface.changeColumn('users', 'username', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });

        await queryInterface.changeColumn('users', 'password', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.changeColumn('users', 'email', {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false,
        });

        await queryInterface.changeColumn('users', 'username', {
            type: Sequelize.STRING,
            allowNull: true,
            unique: false,
        });

        await queryInterface.changeColumn('users', 'password', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};


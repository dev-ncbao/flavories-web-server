'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            genderId: {
                references: {
                    model: 'gender',
                    key: 'genderId'
                },
                type: Sequelize.INTEGER,
                allowNull: true
            },
            roleId: {
                references: {
                    model: 'roles',
                    key: 'roleId'
                },
                type: Sequelize.INTEGER,
                allowNull: true
            },
            firstName: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            lastName: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            avatarUrl: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            bio: {
                type: Sequelize.TEXT,
                allowNull: true
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

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    }
};

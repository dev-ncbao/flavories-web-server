'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: { allowNull: true, type: Sequelize.STRING },
            lastName: { allowNull: true, type: Sequelize.STRING },
            gender: { allowNull: true, type: Sequelize.INTEGER },
            email: { allowNull: true, unique: true, type: Sequelize.STRING },
            username: { allowNull: true, unique: true, type: Sequelize.STRING },
            passwordHashed: {
                allowNull: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            avatarUrl: { allowNull: true, type: Sequelize.STRING },
            bio: { allowNull: true, type: Sequelize.STRING },
            role: { allowNull: true, type: Sequelize.INTEGER },
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
        await queryInterface.dropTable('users');
    }
};

// bunx sequelize-cli model:create --name user --attributes firstName:string,lastName:string,email:string,passwordHashed:string,avatarUrl:string,bio:string,role:integer


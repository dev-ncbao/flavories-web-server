'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        const plainPassword = '1111';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const users = [];

        // admin
        users.push({
            firstName: 'admin',
            email: 'admin@flavories.com',
            username: 'admin',
            role: 1,
            passwordHashed: await bcrypt.hash('admin', 10),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // chef
        for (let i = 0; i < 20; i++) {
            users.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                username: faker.internet.username(),
                role: 2,
                bio: faker.person.bio(),
                gender: faker.number.int(1, 2),
                avatarUrl: faker.image.avatar(),
                passwordHashed: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        // user
        for (let i = 0; i < 20; i++) {
            users.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                username: faker.internet.username(),
                role: 3,
                bio: faker.person.bio(),
                gender: faker.number.int(1, 2),
                avatarUrl: faker.image.avatar(),
                passwordHashed: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('users', users, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('users', null, {});
    }
};

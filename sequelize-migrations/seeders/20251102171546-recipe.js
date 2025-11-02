'use strict';

const { faker } = require('@faker-js/faker');

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

        const recipes = [];

        for (let i = 0; i < 30; i++) {
            recipes.push({
                name: faker.food.dish(),
                description: faker.food.description(),
                image: faker.image.urlLoremFlickr({
                    category: 'Food',
                    height: 480,
                    width: 640
                }),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('recipes', recipes, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('recipes', null, {});
    }
};


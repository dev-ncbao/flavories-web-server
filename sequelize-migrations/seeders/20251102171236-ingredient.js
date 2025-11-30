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

        // Get all unit IDs
        const units = await queryInterface.sequelize.query(
            'SELECT id FROM units',
            { type: Sequelize.QueryTypes.SELECT }
        );
        const unitIds = units.map(u => u.id);

        const ingredients = [];

        for (let i = 0; i < 30; i++) {
            ingredients.push({
                name: faker.food.ingredient(),
                unitId: faker.helpers.arrayElement(unitIds),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        await queryInterface.bulkInsert('ingredients', ingredients, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('ingredients', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE ingredients AUTO_INCREMENT = 1;'
        );
    }
};

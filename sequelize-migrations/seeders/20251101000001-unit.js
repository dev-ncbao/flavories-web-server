'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('units', [
            { id: 1, name: 'cup', abbreviation: 'c', createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'tablespoon', abbreviation: 'tbsp', createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'teaspoon', abbreviation: 'tsp', createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'gram', abbreviation: 'g', createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'kilogram', abbreviation: 'kg', createdAt: new Date(), updatedAt: new Date() },
            { id: 6, name: 'milliliter', abbreviation: 'ml', createdAt: new Date(), updatedAt: new Date() },
            { id: 7, name: 'liter', abbreviation: 'l', createdAt: new Date(), updatedAt: new Date() },
            { id: 8, name: 'ounce', abbreviation: 'oz', createdAt: new Date(), updatedAt: new Date() },
            { id: 9, name: 'pound', abbreviation: 'lb', createdAt: new Date(), updatedAt: new Date() },
            { id: 10, name: 'piece', abbreviation: 'pc', createdAt: new Date(), updatedAt: new Date() },
            { id: 11, name: 'pinch', abbreviation: null, createdAt: new Date(), updatedAt: new Date() },
            { id: 12, name: 'dash', abbreviation: null, createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('units', null, {});
        await queryInterface.sequelize.query('ALTER TABLE units AUTO_INCREMENT = 1;');
    }
};

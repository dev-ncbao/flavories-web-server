'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'units',
            [
                { unitId: 1, name: 'gram', abbreviation: 'g', createdAt: now, updatedAt: now },
                { unitId: 2, name: 'kilogram', abbreviation: 'kg', createdAt: now, updatedAt: now },
                { unitId: 3, name: 'milliliter', abbreviation: 'ml', createdAt: now, updatedAt: now },
                { unitId: 4, name: 'liter', abbreviation: 'l', createdAt: now, updatedAt: now },
                { unitId: 5, name: 'cup', abbreviation: 'cup', createdAt: now, updatedAt: now },
                { unitId: 6, name: 'tablespoon', abbreviation: 'tbsp', createdAt: now, updatedAt: now },
                { unitId: 7, name: 'teaspoon', abbreviation: 'tsp', createdAt: now, updatedAt: now },
                { unitId: 8, name: 'ounce', abbreviation: 'oz', createdAt: now, updatedAt: now },
                { unitId: 9, name: 'pound', abbreviation: 'lb', createdAt: now, updatedAt: now },
                { unitId: 10, name: 'fluid ounce', abbreviation: 'fl oz', createdAt: now, updatedAt: now },
                { unitId: 11, name: 'pint', abbreviation: 'pt', createdAt: now, updatedAt: now },
                { unitId: 12, name: 'quart', abbreviation: 'qt', createdAt: now, updatedAt: now },
                { unitId: 13, name: 'gallon', abbreviation: 'gal', createdAt: now, updatedAt: now },
                { unitId: 14, name: 'piece', abbreviation: 'pc', createdAt: now, updatedAt: now },
                { unitId: 15, name: 'slice', abbreviation: 'slice', createdAt: now, updatedAt: now },
                { unitId: 16, name: 'clove', abbreviation: 'clove', createdAt: now, updatedAt: now },
                { unitId: 17, name: 'bunch', abbreviation: 'bunch', createdAt: now, updatedAt: now },
                { unitId: 18, name: 'sprig', abbreviation: 'sprig', createdAt: now, updatedAt: now },
                { unitId: 19, name: 'handful', abbreviation: 'handful', createdAt: now, updatedAt: now },
                { unitId: 20, name: 'pinch', abbreviation: 'pinch', createdAt: now, updatedAt: now },
                { unitId: 21, name: 'dash', abbreviation: 'dash', createdAt: now, updatedAt: now },
                { unitId: 22, name: 'stick', abbreviation: 'stick', createdAt: now, updatedAt: now },
                { unitId: 23, name: 'sheet', abbreviation: 'sheet', createdAt: now, updatedAt: now },
                { unitId: 24, name: 'can', abbreviation: 'can', createdAt: now, updatedAt: now },
                { unitId: 25, name: 'package', abbreviation: 'pkg', createdAt: now, updatedAt: now },
                { unitId: 26, name: 'packet', abbreviation: 'packet', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('units', null, {});
    }
};


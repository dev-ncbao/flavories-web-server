'use strict';

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

        const genders = [
            { name: 'Male', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Female', createdAt: new Date(), updatedAt: new Date() }
        ];

        await queryInterface.bulkInsert('genders', genders, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('genders', null, {});
    }
};


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'gender',
            [
                { genderId: 1, name: 'Male', createdAt: now, updatedAt: now },
                { genderId: 2, name: 'Female', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('gender', null, {});
    }
};

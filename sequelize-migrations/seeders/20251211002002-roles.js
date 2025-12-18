'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'roles',
            [
                { roleId: 1, name: 'Admin', createdAt: now, updatedAt: now },
                { roleId: 2, name: 'Instructor', createdAt: now, updatedAt: now },
                { roleId: 3, name: 'Member', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};


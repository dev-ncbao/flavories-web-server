'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'roles',
            [
                { roleId: 1, name: 'admin', createdAt: now, updatedAt: now },
                { roleId: 2, name: 'instructor', createdAt: now, updatedAt: now },
                { roleId: 3, name: 'member', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', null, {});
    }
};


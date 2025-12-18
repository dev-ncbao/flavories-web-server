'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'reaction_types',
            [
                { reactionTypeId: 1, name: 'Like', createdAt: now, updatedAt: now },
                { reactionTypeId: 2, name: 'Dislike', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('reaction_types', null, {});
    }
};


'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        const reactionTypes = [1, 2]; // like, dislike
        const userIds = Array.from({ length: 30 }, (_, i) => i + 1); // one reaction per user per recipe
        const rows = [];

        for (let recipeId = 1; recipeId <= 50; recipeId += 1) {
            userIds.forEach((userId, idx) => {
                const reactionTypeId = reactionTypes[(recipeId + idx) % reactionTypes.length];
                rows.push({
                    reactionTypeId,
                    recipeId,
                    userId,
                    createdAt: now,
                    updatedAt: now
                });
            });
        }

        await queryInterface.bulkInsert('recipe_reactions', rows, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_reactions', null, {});
    }
};

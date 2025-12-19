'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        const ingredientPool = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30
        ];

        const rows = [];
        for (let recipeId = 1; recipeId <= 50; recipeId += 1) {
            const offset = (recipeId - 1) % ingredientPool.length;
            for (let i = 0; i < 6; i += 1) {
                const ingredientId = ingredientPool[(offset + i) % ingredientPool.length];
                const amount = 50 + (recipeId % 5) * 20 + i * 10; // varied but plausible amounts
                rows.push({
                    ingredientId,
                    recipeId,
                    amount,
                    createdAt: now,
                    updatedAt: now
                });
            }
        }

        await queryInterface.bulkInsert('recipe_ingredients', rows, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_ingredients', null, {});
    }
};


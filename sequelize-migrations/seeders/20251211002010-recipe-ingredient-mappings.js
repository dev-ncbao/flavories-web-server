'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipe_ingredient_mappings',
            [
                { ingredientId: 1, recipeId: 1, amount: 500.0, createdAt: now, updatedAt: now },
                { ingredientId: 5, recipeId: 1, amount: 2.0, createdAt: now, updatedAt: now },
                { ingredientId: 6, recipeId: 1, amount: 0.5, createdAt: now, updatedAt: now },

                { ingredientId: 4, recipeId: 2, amount: 1.5, createdAt: now, updatedAt: now },
                { ingredientId: 3, recipeId: 2, amount: 20.0, createdAt: now, updatedAt: now },
                { ingredientId: 6, recipeId: 2, amount: 0.5, createdAt: now, updatedAt: now },

                { ingredientId: 2, recipeId: 3, amount: 300.0, createdAt: now, updatedAt: now },
                { ingredientId: 10, recipeId: 3, amount: 1.0, createdAt: now, updatedAt: now },

                { ingredientId: 7, recipeId: 4, amount: 2.0, createdAt: now, updatedAt: now },
                { ingredientId: 8, recipeId: 4, amount: 6.0, createdAt: now, updatedAt: now },

                { ingredientId: 9, recipeId: 5, amount: 80.0, createdAt: now, updatedAt: now },
                { ingredientId: 7, recipeId: 5, amount: 1.0, createdAt: now, updatedAt: now },
                { ingredientId: 10, recipeId: 5, amount: 1.0, createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_ingredient_mappings', null, {});
    }
};


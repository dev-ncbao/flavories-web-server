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

        const recipeIngredients = [];

        for (let i = 1; i <= 30; i++) {
            for (
                let j = 1;
                j < Math.floor(Math.random() * (12 - 5 + 1)) + 5;
                j++
            ) {
                recipeIngredients.push({
                    recipeId: i,
                    ingredientId: j,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        await queryInterface.bulkInsert(
            'recipe_ingredients',
            recipeIngredients,
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('recipe_ingredients', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_ingredients AUTO_INCREMENT = 1;'
        );
    }
};


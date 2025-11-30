'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const recipes = await queryInterface.sequelize.query(
            'SELECT id FROM recipes',
            { type: Sequelize.QueryTypes.SELECT }
        );

        const users = await queryInterface.sequelize.query(
            'SELECT id FROM users',
            { type: Sequelize.QueryTypes.SELECT }
        );

        if (recipes.length === 0 || users.length === 0) {
            console.log(
                'No recipes or users found. Please seed recipes and users first.'
            );
            return;
        }

        const views = [];

        // Each recipe gets 50-500 views (including both authenticated and anonymous)
        for (const recipe of recipes) {
            const numberOfViews = faker.number.int({ min: 50, max: 500 });

            for (let i = 0; i < numberOfViews; i++) {
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1),
                    to: new Date()
                });

                // 70% authenticated views, 30% anonymous views
                const isAuthenticated = faker.datatype.boolean({
                    probability: 0.7
                });
                const userId = isAuthenticated
                    ? faker.helpers.arrayElement(users).id
                    : null;

                views.push({
                    userId: userId,
                    recipeId: recipe.id,
                    createdAt: createdAt,
                    updatedAt: createdAt
                });
            }
        }

        await queryInterface.bulkInsert('recipe_views', views, {});

        console.log(
            `✅ Successfully created ${views.length} views for ${recipes.length} recipes`
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('recipe_views', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_views AUTO_INCREMENT = 1;'
        );
    }
};

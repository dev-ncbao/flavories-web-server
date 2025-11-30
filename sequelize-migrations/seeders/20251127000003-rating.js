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

        const ratings = [];

        // Each recipe gets 20-80 random ratings from different users
        for (const recipe of recipes) {
            const numberOfRatings = faker.number.int({ min: 20, max: 80 });
            const selectedUsers = faker.helpers
                .shuffle([...users])
                .slice(0, numberOfRatings);

            for (const user of selectedUsers) {
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1),
                    to: new Date()
                });

                // Generate ratings with realistic distribution (more 4-5 stars, fewer 1-2 stars)
                const ratingValue = faker.helpers.weightedArrayElement([
                    { weight: 5, value: 5.0 },
                    { weight: 4, value: 4.5 },
                    { weight: 8, value: 4.0 },
                    { weight: 3, value: 3.5 },
                    { weight: 5, value: 3.0 },
                    { weight: 2, value: 2.5 },
                    { weight: 2, value: 2.0 },
                    { weight: 1, value: 1.5 },
                    { weight: 1, value: 1.0 }
                ]);

                ratings.push({
                    userId: user.id,
                    recipeId: recipe.id,
                    rating: ratingValue,
                    createdAt: createdAt,
                    updatedAt: createdAt
                });
            }
        }

        await queryInterface.bulkInsert('recipe_ratings', ratings, {});

        console.log(
            `✅ Successfully created ${ratings.length} ratings for ${recipes.length} recipes`
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('recipe_ratings', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_ratings AUTO_INCREMENT = 1;'
        );
    }
};

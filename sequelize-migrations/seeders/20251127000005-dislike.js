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

        const dislikes = [];

        // Each recipe gets 0-15 dislikes from different users (fewer dislikes than likes)
        for (const recipe of recipes) {
            const numberOfDislikes = faker.number.int({ min: 0, max: 15 });
            const selectedUsers = faker.helpers
                .shuffle([...users])
                .slice(0, numberOfDislikes);

            for (const user of selectedUsers) {
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1),
                    to: new Date()
                });

                dislikes.push({
                    userId: user.id,
                    recipeId: recipe.id,
                    createdAt: createdAt,
                    updatedAt: createdAt
                });
            }
        }

        await queryInterface.bulkInsert('dislikes', dislikes, {});

        console.log(
            `✅ Successfully created ${dislikes.length} dislikes for ${recipes.length} recipes`
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('dislikes', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE dislikes AUTO_INCREMENT = 1;'
        );
    }
};

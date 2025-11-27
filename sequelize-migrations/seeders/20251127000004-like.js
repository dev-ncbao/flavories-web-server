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
            console.log('No recipes or users found. Please seed recipes and users first.');
            return;
        }

        const likes = [];
        
        // Each recipe gets 10-60 likes from different users
        for (const recipe of recipes) {
            const numberOfLikes = faker.number.int({ min: 10, max: 60 });
            const selectedUsers = faker.helpers.shuffle([...users]).slice(0, numberOfLikes);

            for (const user of selectedUsers) {
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1),
                    to: new Date()
                });

                likes.push({
                    userId: user.id,
                    recipeId: recipe.id,
                    createdAt: createdAt,
                    updatedAt: createdAt
                });
            }
        }

        await queryInterface.bulkInsert('likes', likes, {});

        console.log(`✅ Successfully created ${likes.length} likes for ${recipes.length} recipes`);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('likes', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE likes AUTO_INCREMENT = 1;'
        );
    }
};

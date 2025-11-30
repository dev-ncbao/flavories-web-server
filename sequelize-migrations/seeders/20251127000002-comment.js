'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Get all recipes and users to create realistic comments
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

        const comments = [];
        let commentId = 1;

        // Create 10 comments for each recipe
        for (const recipe of recipes) {
            // Create 6 top-level comments
            const topLevelCommentIds = [];

            for (let i = 0; i < 6; i++) {
                const randomUser = faker.helpers.arrayElement(users);
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1), // November 1, 2025
                    to: new Date() // Today
                });

                comments.push({
                    id: commentId,
                    content: faker.helpers.arrayElement([
                        'This recipe is absolutely delicious! Thank you for sharing.',
                        'I tried this last night and my family loved it!',
                        'Great recipe! I made a few adjustments and it turned out perfect.',
                        'This is now one of my favorite recipes. Easy to follow and tasty!',
                        'Wonderful dish! The flavors are amazing.',
                        "I've made this several times already. Never disappoints!",
                        'Perfect for a family dinner. Highly recommend!',
                        'Simple yet delicious. Exactly what I was looking for.',
                        'The instructions were clear and easy to follow. Great results!',
                        "Amazing recipe! Can't wait to make it again.",
                        'This exceeded my expectations. So good!',
                        'Fantastic! Everyone asked for seconds.',
                        'Quick and easy to make. Turned out great!',
                        'Delicious! I added some extra spices and it was perfect.',
                        "Best recipe I've tried in a while. Thank you!"
                    ]),
                    userId: randomUser.id,
                    recipeId: recipe.id,
                    parentId: null,
                    likeCount: faker.number.int({ min: 0, max: 50 }),
                    createdAt: createdAt,
                    updatedAt: createdAt
                });

                topLevelCommentIds.push(commentId);
                commentId++;
            }

            // Create 4 reply comments (depth level 2)
            // Randomly distribute replies among top-level comments
            for (let i = 0; i < 4; i++) {
                const randomUser = faker.helpers.arrayElement(users);
                const parentCommentId =
                    faker.helpers.arrayElement(topLevelCommentIds);
                const createdAt = faker.date.between({
                    from: new Date(2025, 10, 1),
                    to: new Date()
                });

                comments.push({
                    id: commentId,
                    content: faker.helpers.arrayElement([
                        'Thanks for the feedback! Glad you enjoyed it!',
                        'I agree! This recipe is a keeper.',
                        "Same here! I've made this multiple times.",
                        "What adjustments did you make? I'd love to try them!",
                        'Did you use any substitutions? Looking for healthier options.',
                        'How long did it take you to prepare?',
                        'I had the same experience! So delicious.',
                        "Great tip! I'll try that next time.",
                        'Thanks for sharing your experience!',
                        "I'm definitely going to try this soon!",
                        'Appreciate the recommendation!',
                        'Good to know! Thanks for the heads up.',
                        "That's a great suggestion!",
                        "I'll keep that in mind when I make this.",
                        'Thanks for the helpful comment!'
                    ]),
                    userId: randomUser.id,
                    recipeId: recipe.id,
                    parentId: parentCommentId,
                    likeCount: faker.number.int({ min: 0, max: 20 }),
                    createdAt: createdAt,
                    updatedAt: createdAt
                });

                commentId++;
            }
        }

        await queryInterface.bulkInsert('recipe_comments', comments, {});

        console.log(
            `✅ Successfully created ${comments.length} comments for ${recipes.length} recipes`
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('recipe_comments', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_comments AUTO_INCREMENT = 1;'
        );
    }
};

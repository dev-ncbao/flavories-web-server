'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipe_comments',
            [
                { recipeCommentId: 1, userId: 4, comment: 'Tried this lemongrass chicken—juicy and flavorful!', createdAt: now, updatedAt: now },
                { recipeCommentId: 2, userId: 5, comment: 'Coconut curry broth was perfect with extra chili.', createdAt: now, updatedAt: now },
                { recipeCommentId: 3, userId: 4, comment: 'Crispy beef banh mi reminded me of Saigon street stalls.', createdAt: now, updatedAt: now },
                { recipeCommentId: 4, userId: 5, comment: 'Garlic butter shrimp was a hit at dinner—thanks!', createdAt: now, updatedAt: now },
                { recipeCommentId: 5, userId: 4, comment: 'Risotto came out creamy; added extra mushrooms.', createdAt: now, updatedAt: now }
            ],
            {}
        );

        await queryInterface.bulkInsert(
            'course_comments',
            [
                { courseCommentId: 6, userId: 6, comment: 'Loved the pacing of the comfort dinners course!', createdAt: now, updatedAt: now },
                { courseCommentId: 7, userId: 7, comment: 'Seafood masterclass helped me perfect searing salmon.', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('course_comments', null, {});
        await queryInterface.bulkDelete('recipe_comments', null, {});
    }
};


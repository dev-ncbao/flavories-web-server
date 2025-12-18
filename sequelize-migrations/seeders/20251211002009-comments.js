'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'comments',
            [
                {
                    commentId: 1,
                    userId: 4,
                    comment: 'Tried this lemongrass chicken—juicy and flavorful!',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 2,
                    userId: 5,
                    comment: 'Coconut curry broth was perfect with extra chili.',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 3,
                    userId: 4,
                    comment: 'Crispy beef banh mi reminded me of Saigon street stalls.',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 4,
                    userId: 5,
                    comment: 'Garlic butter shrimp was a hit at dinner—thanks!',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 5,
                    userId: 4,
                    comment: 'Risotto came out creamy; added extra mushrooms.',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 6,
                    userId: 6,
                    comment: 'Loved the pacing of the comfort dinners course!',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    commentId: 7,
                    userId: 7,
                    comment: 'Seafood masterclass helped me perfect searing salmon.',
                    createdAt: now,
                    updatedAt: now
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('comments', null, {});
    }
};


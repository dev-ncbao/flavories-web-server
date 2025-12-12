'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'courses',
            [
                {
                    courseId: 1,
                    videoUrl: 'https://videos.example.com/courses/vietnamese-street-food.mp4',
                    name: 'Vietnamese Street Food Essentials',
                    description: 'Hands-on lessons covering pho, banh mi, and classic street dishes.',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 2,
                    videoUrl: 'https://videos.example.com/courses/comfort-dinners.mp4',
                    name: 'Weeknight Comfort Dinners',
                    description: 'Quick, cozy dinners with minimal prep and big flavors.',
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 3,
                    videoUrl: 'https://videos.example.com/courses/seafood-masterclass.mp4',
                    name: 'Seafood Masterclass',
                    description: 'Techniques for perfectly seared, grilled, and sauced seafood.',
                    createdAt: now,
                    updatedAt: now
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('courses', null, {});
    }
};


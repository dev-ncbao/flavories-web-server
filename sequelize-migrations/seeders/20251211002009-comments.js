'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        // 10 comments per recipe (recipes 1..50)
        const recipeComments = [];
        let recipeCommentId = 1;
        const recipeUserPool = Array.from({ length: 30 }, (_, i) => i + 1);
        for (let recipeId = 1; recipeId <= 50; recipeId += 1) {
            for (let i = 0; i < 10; i += 1) {
                const userId = recipeUserPool[(recipeId + i) % recipeUserPool.length];
                recipeComments.push({
                    recipeCommentId: recipeCommentId++,
                    recipeId,
                    userId,
                    comment: `Comment ${i + 1} on recipe ${recipeId}`,
                    createdAt: now,
                    updatedAt: now
                });
            }
        }
        await queryInterface.bulkInsert('recipe_comments', recipeComments, {});

        // 3 comments per course (courses 1..20)
        const courseComments = [];
        let courseCommentId = 1;
        const courseUserPool = Array.from({ length: 30 }, (_, i) => i + 1);
        for (let courseId = 1; courseId <= 20; courseId += 1) {
            for (let i = 0; i < 3; i += 1) {
                const userId = courseUserPool[(courseId + i) % courseUserPool.length];
                courseComments.push({
                    courseCommentId: courseCommentId++,
                    courseId,
                    userId,
                    comment: `Comment ${i + 1} on course ${courseId}`,
                    createdAt: now,
                    updatedAt: now
                });
            }
        }
        await queryInterface.bulkInsert('course_comments', courseComments, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('course_comments', null, {});
        await queryInterface.bulkDelete('recipe_comments', null, {});
    }
};


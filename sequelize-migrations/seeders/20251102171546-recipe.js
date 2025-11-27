'use strict';

const { faker } = require('@faker-js/faker');

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

        const recipes = [];

        // Array of food image IDs from a reliable source
        const foodImages = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
            'https://images.unsplash.com/photo-1529042410759-befb1204b468',
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
            'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
            'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
            'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
            'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec',
            'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9',
            'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307',
            'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
            'https://images.unsplash.com/photo-1547592180-85f173990554',
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
        ];

        for (let i = 0; i < 100; i++) {
            const dishName = faker.food.dish();
            const adjectives = ['delicious', 'savory', 'mouth-watering', 'authentic', 'homemade', 'classic', 'traditional', 'flavorful', 'aromatic', 'tender'];
            const preparationMethods = ['perfectly cooked', 'expertly prepared', 'carefully crafted', 'slow-cooked', 'freshly made', 'hand-crafted', 'traditionally prepared'];
            
            const adjective = faker.helpers.arrayElement(adjectives);
            const method = faker.helpers.arrayElement(preparationMethods);
            const description = `A ${adjective} ${dishName} recipe, ${method} with ${faker.food.ingredient()}, ${faker.food.ingredient()}, and ${faker.food.ingredient()}. ${faker.lorem.sentence()}`;
            
            // Pick a random food image from the array
            const randomImage = faker.helpers.arrayElement(foodImages);
            
            const rating = parseFloat((faker.number.float({ min: 0, max: 5, fractionDigits: 1 })).toFixed(1));
            const likeCount = faker.number.int({ min: 0, max: 1000 });
            const dislikeCount = faker.number.int({ min: 0, max: 100 });
            const viewCount = faker.number.int({ min: 100, max: 10000 });
            const commentCount = faker.number.int({ min: 0, max: 200 });
            
            // Calculate trending score
            const ratingScore = rating * 20; // Max 100 points from rating
            const likeScore = likeCount * 0.1; // Likes contribute positively
            const dislikeScore = dislikeCount * -0.2; // Dislikes penalize
            const viewScore = viewCount * 0.01; // Views contribute
            const commentScore = commentCount * 0.5; // Comments show engagement
            const trendingScore = parseFloat((ratingScore + likeScore + dislikeScore + viewScore + commentScore).toFixed(2));
            
            // Dynamic date calculation
            const now = new Date();
            const currentYear = now.getFullYear();
            const currentMonth = now.getMonth(); // 0-indexed (0 = January, 10 = November)
            
            // First 50 recipes: created in current month
            // Remaining 50 recipes: created in previous 6 months
            let createdAt;
            if (i < 50) {
                // Current month recipes
                const startOfMonth = new Date(currentYear, currentMonth, 1);
                createdAt = faker.date.between({ 
                    from: startOfMonth,
                    to: now
                });
            } else {
                // Previous 6 months recipes
                const sixMonthsAgo = new Date(currentYear, currentMonth - 6, 1);
                const endOfLastMonth = new Date(currentYear, currentMonth, 0); // Last day of previous month
                createdAt = faker.date.between({ 
                    from: sixMonthsAgo,
                    to: endOfLastMonth
                });
            }
            
            // updatedAt is between createdAt and now
            const updatedAt = faker.date.between({ 
                from: createdAt, 
                to: now
            });
            
            recipes.push({
                name: dishName,
                description: description,
                thumbnail: `${randomImage}?w=640&h=480&fit=crop`,
                rating: rating,
                likeCount: likeCount,
                dislikeCount: dislikeCount,
                viewCount: viewCount,
                commentCount: commentCount,
                trendingScore: trendingScore,
                createdAt: createdAt,
                updatedAt: updatedAt
            });
        }

        await queryInterface.bulkInsert('recipes', recipes, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('recipes', null, {});

        await queryInterface.sequelize.query(
            'ALTER TABLE recipes AUTO_INCREMENT = 1;'
        );
    }
};


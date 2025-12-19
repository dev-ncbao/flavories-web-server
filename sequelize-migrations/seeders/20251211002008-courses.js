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
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    userId: 2,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
                    name: 'Vietnamese Street Food Essentials',
                    description:
                        'Hands-on lessons covering pho, banh mi, and classic street dishes.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 1,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 2,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    userId: 3,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
                    name: 'Weeknight Comfort Dinners',
                    description:
                        'Quick, cozy dinners with minimal prep and big flavors.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 2,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 3,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    userId: 9,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
                    name: 'Seafood Masterclass',
                    description:
                        'Techniques for perfectly seared, grilled, and sauced seafood.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 3,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 4,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                    userId: 10,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
                    name: 'Fast & Flavorful Pasta Night',
                    description:
                        'Master 3 weeknight pasta dishes under 30 minutes.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 14,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 5,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                    userId: 13,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
                    name: 'Artisan Sourdough at Home',
                    description:
                        'From starter to bake: reliable sourdough techniques.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 6,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                    userId: 21,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
                    name: 'Sushi Rolling Basics',
                    description:
                        'Maki, uramaki, and nigiri fundamentals with pantry-friendly tips.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 30,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 7,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                    userId: 16,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
                    name: 'Low & Slow BBQ Brisket',
                    description:
                        'Trim, rub, smoke, and slice a competition-style brisket.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 8,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                    userId: 15,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
                    name: 'Vegan Meal Prep Staples',
                    description:
                        'Batch-cook grains, legumes, and sauces for the week.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 44,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 9,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
                    userId: 14,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
                    name: 'Thai Curry Fundamentals',
                    description:
                        'Red, green, and panang curry pastes from scratch.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 28,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 10,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                    userId: 5,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
                    name: 'Taco Night Essentials',
                    description:
                        'Handmade tortillas, salsas, and three classic fillings.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 34,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 11,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
                    userId: 3,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg',
                    name: 'Indian Curries 101',
                    description:
                        'Masala bases, tempering, and five weeknight-friendly curries.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 22,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 12,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
                    userId: 8,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg',
                    name: 'Ramen at Home',
                    description:
                        'Broths, tare, chashu, and noodles without special equipment.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 20,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 13,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                    userId: 7,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
                    name: 'Power Salad & Grain Bowls',
                    description:
                        'Layer textures, dressings, and proteins for balanced bowls.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 31,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 14,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                    userId: 11,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
                    name: 'Cake Baking Foundations',
                    description:
                        'Sponge, butter, and chiffon cakes with dependable methods.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 15,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
                    userId: 12,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
                    name: 'Chocolate Desserts',
                    description:
                        'Ganache, lava cakes, brownies, and tempering basics.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 48,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 16,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    userId: 18,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
                    name: 'Kimchi & Fermentation Basics',
                    description:
                        'Salt ratios, brines, and safe fermentation at home.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 17,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    userId: 6,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
                    name: 'Neapolitan Pizza at Home',
                    description:
                        'High-hydration dough, shaping, and baking in home ovens.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 9,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 18,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
                    userId: 20,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
                    name: 'Dim Sum Classics',
                    description:
                        'Dumplings, buns, and steaming techniques step-by-step.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 47,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 19,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                    userId: 17,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
                    name: 'Spanish Tapas Night',
                    description:
                        'Patatas bravas, gambas al ajillo, tortilla, and more.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 42,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    courseId: 20,
                    videoUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                    userId: 19,
                    thumbnailUrl:
                        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
                    name: 'Smoothie & Açaí Bowls',
                    description:
                        'Blend thick bases, crunchy toppings, and balanced flavors.',
                    viewCount: 0,
                    commentCount: 0,
                    rating: 0,
                    price: 2000,
                    linkedRecipeId: 29,
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

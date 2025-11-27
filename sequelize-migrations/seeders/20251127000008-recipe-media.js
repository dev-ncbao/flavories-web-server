'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Get all recipe IDs (assume at least 10 recipes)
        const recipes = await queryInterface.sequelize.query(
            'SELECT id FROM recipes',
            { type: Sequelize.QueryTypes.SELECT }
        );
        const mediaTypes = await queryInterface.sequelize.query(
            'SELECT id FROM media_types',
            { type: Sequelize.QueryTypes.SELECT }
        );
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
        // Pick a random food image from the array
        const randomImage = faker.helpers.arrayElement(foodImages);
        const mediaTypeIds = mediaTypes.map((mt) => mt.id);
        const media = [];
        let id = 1;
        for (const recipe of recipes) {
            // Add 2 images and 1 video per recipe
            media.push({
                id: id++,
                recipeId: recipe.id,
                mediaTypeId: mediaTypeIds[0], // image
                url: `${randomImage}?w=640&h=480&fit=crop`,
                altText: faker.lorem.words(3),
                sortOrder: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            media.push({
                id: id++,
                recipeId: recipe.id,
                mediaTypeId: mediaTypeIds[0], // image
                url: `${randomImage}?w=640&h=480&fit=crop`,
                altText: faker.lorem.words(2),
                sortOrder: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            media.push({
                id: id++,
                recipeId: recipe.id,
                mediaTypeId: mediaTypeIds[1] || mediaTypeIds[0], // video or fallback to image
                url: faker.helpers.arrayElement([
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    'https://videos.pexels.com/video.mp4',
                    'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
                ]),
                altText: faker.lorem.words(2),
                sortOrder: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await queryInterface.bulkInsert('recipe_media', media);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('recipe_media', null, {});
        await queryInterface.sequelize.query(
            'ALTER TABLE recipe_media AUTO_INCREMENT = 1;'
        );
    }
};

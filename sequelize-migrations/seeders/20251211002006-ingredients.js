'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'ingredients',
            [
                { ingredientId: 1, unitId: 1, name: 'Chicken breast', createdAt: now, updatedAt: now },
                { ingredientId: 2, unitId: 1, name: 'Beef flank', createdAt: now, updatedAt: now },
                { ingredientId: 3, unitId: 1, name: 'Fresh basil', createdAt: now, updatedAt: now },
                { ingredientId: 4, unitId: 5, name: 'Coconut milk', createdAt: now, updatedAt: now },
                { ingredientId: 5, unitId: 6, name: 'Fish sauce', createdAt: now, updatedAt: now },
                { ingredientId: 6, unitId: 7, name: 'Chili flakes', createdAt: now, updatedAt: now },
                { ingredientId: 7, unitId: 6, name: 'Olive oil', createdAt: now, updatedAt: now },
                { ingredientId: 8, unitId: 14, name: 'Egg', createdAt: now, updatedAt: now },
                { ingredientId: 9, unitId: 1, name: 'Parmesan cheese', createdAt: now, updatedAt: now },
                { ingredientId: 10, unitId: 20, name: 'Salt', createdAt: now, updatedAt: now },
                { ingredientId: 11, unitId: 16, name: 'Garlic', createdAt: now, updatedAt: now },
                { ingredientId: 12, unitId: 17, name: 'Cilantro', createdAt: now, updatedAt: now },
                { ingredientId: 13, unitId: 3, name: 'Lime juice', createdAt: now, updatedAt: now },
                { ingredientId: 14, unitId: 5, name: 'Chicken stock', createdAt: now, updatedAt: now },
                { ingredientId: 15, unitId: 1, name: 'Rice noodles', createdAt: now, updatedAt: now },
                { ingredientId: 16, unitId: 1, name: 'Baguette', createdAt: now, updatedAt: now },
                { ingredientId: 17, unitId: 1, name: 'Pork belly', createdAt: now, updatedAt: now },
                { ingredientId: 18, unitId: 6, name: 'Soy sauce', createdAt: now, updatedAt: now },
                { ingredientId: 19, unitId: 6, name: 'Oyster sauce', createdAt: now, updatedAt: now },
                { ingredientId: 20, unitId: 6, name: 'Sesame oil', createdAt: now, updatedAt: now },
                { ingredientId: 21, unitId: 7, name: 'Black pepper', createdAt: now, updatedAt: now },
                { ingredientId: 22, unitId: 6, name: 'Honey', createdAt: now, updatedAt: now },
                { ingredientId: 23, unitId: 6, name: 'Sriracha', createdAt: now, updatedAt: now },
                { ingredientId: 24, unitId: 1, name: 'Shrimp', createdAt: now, updatedAt: now },
                { ingredientId: 25, unitId: 1, name: 'Salmon fillet', createdAt: now, updatedAt: now },
                { ingredientId: 26, unitId: 1, name: 'Tofu', createdAt: now, updatedAt: now },
                { ingredientId: 27, unitId: 18, name: 'Rosemary sprig', createdAt: now, updatedAt: now },
                { ingredientId: 28, unitId: 18, name: 'Thyme sprig', createdAt: now, updatedAt: now },
                { ingredientId: 29, unitId: 1, name: 'Potato', createdAt: now, updatedAt: now },
                { ingredientId: 30, unitId: 1, name: 'Carrot', createdAt: now, updatedAt: now }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('ingredients', null, {});
    }
};


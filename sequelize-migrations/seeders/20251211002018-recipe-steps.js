'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        const steps = [];

        const titles = {
            1: 'Lemongrass Grilled Chicken',
            2: 'Coconut Curry Noodles',
            3: 'Crispy Beef Banh Mi',
            4: 'Garlic Butter Shrimp',
            5: 'Creamy Mushroom Risotto',
            6: 'Spicy Thai Basil Chicken',
            7: 'Roasted Veggie Quinoa Bowl',
            8: 'Herb-Crusted Salmon',
            9: 'Classic Margherita Pizza',
            10: 'Beef Pho',
            11: 'Chicken Tikka Masala',
            12: 'Vegetarian Pad Thai',
            13: 'Korean BBQ Beef (Bulgogi)',
            14: 'Pesto Pasta with Cherry Tomatoes',
            15: 'Shakshuka',
            16: 'Mediterranean Mezze Platter',
            17: 'Teriyaki Chicken Rice Bowl',
            18: 'BBQ Pulled Pork Sandwich',
            19: 'Greek Salad with Feta',
            20: 'Miso Ramen with Tofu',
            21: 'Crispy Fish Tacos',
            22: 'Butter Chicken',
            23: 'Veggie Stir-Fry with Cashews',
            24: 'Spaghetti Carbonara',
            25: 'Avocado Toast with Poached Egg',
            26: 'Roasted Tomato Soup',
            27: 'Caprese Salad',
            28: 'Thai Green Curry',
            29: 'Pumpkin Spice Pancakes',
            30: 'Sushi Bowl',
            31: 'Mediterranean Grain Bowl',
            32: 'Fried Rice with Shrimp',
            33: 'Baked Ziti',
            34: 'Chicken Enchiladas',
            35: 'Falafel Wrap',
            36: 'Chili Con Carne',
            37: 'Veggie Lasagna',
            38: 'Chicken Caesar Salad',
            39: 'Beef Stir-Fry',
            40: 'Eggplant Parmesan',
            41: 'Stuffed Bell Peppers',
            42: 'Seafood Paella',
            43: 'Mushroom Stroganoff',
            44: 'Lentil Dahl',
            45: 'Beef Bourguignon',
            46: 'Chicken Piccata',
            47: 'Thai Mango Sticky Rice',
            48: 'Chocolate Lava Cake',
            49: 'Banana Bread',
            50: 'Tiramisu'
        };

        for (let recipeId = 1; recipeId <= 50; recipeId += 1) {
            const title = titles[recipeId] || `Recipe ${recipeId}`;
            steps.push(
                {
                    recipeStepId: (recipeId - 1) * 4 + 1,
                    recipeId,
                    stepNumber: 1,
                    description: `Prep: Gather ingredients for ${title}, wash and measure.`,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeStepId: (recipeId - 1) * 4 + 2,
                    recipeId,
                    stepNumber: 2,
                    description: `Cook: Start primary cooking step for ${title} (sauté/simmer/roast).`,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeStepId: (recipeId - 1) * 4 + 3,
                    recipeId,
                    stepNumber: 3,
                    description: `Finish: Adjust seasoning, combine components for ${title}.`,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeStepId: (recipeId - 1) * 4 + 4,
                    recipeId,
                    stepNumber: 4,
                    description: `Serve: Plate ${title}, add garnishes, and serve warm.`,
                    createdAt: now,
                    updatedAt: now
                }
            );
        }

        await queryInterface.bulkInsert('recipe_steps', steps, {});
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipe_steps', null, {});
    }
};


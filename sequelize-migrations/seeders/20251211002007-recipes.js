'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        await queryInterface.bulkInsert(
            'recipes',
            [
                {
                    recipeId: 1,
                    userId: 2,
                    name: 'Lemongrass Grilled Chicken',
                    description:
                        'Smoky lemongrass grilled chicken with jasmine rice and pickles.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/food,chicken?lock=1',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 1,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 2,
                    userId: 2,
                    name: 'Coconut Curry Noodles',
                    description:
                        'Creamy coconut curry broth with rice noodles and fresh herbs.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/food,curry?lock=2',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 2,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 3,
                    userId: 3,
                    name: 'Crispy Beef Banh Mi',
                    description:
                        'Toasted baguette filled with crispy beef, pickles, and herbs.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/banhmi,food?lock=3',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 3,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 4,
                    userId: 3,
                    name: 'Garlic Butter Shrimp',
                    description:
                        'Seared shrimp tossed in garlic butter and lemon.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/shrimp,food?lock=4',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 4,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 5,
                    userId: 2,
                    name: 'Creamy Mushroom Risotto',
                    description:
                        'Slow-cooked arborio rice with mushrooms and parmesan.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/risotto,food?lock=5',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 5,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 6,
                    userId: 4,
                    name: 'Spicy Thai Basil Chicken',
                    description:
                        'Ground chicken stir-fried with basil, chilies, and garlic.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/thai,food?lock=6',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 7,
                    userId: 5,
                    name: 'Roasted Veggie Quinoa Bowl',
                    description:
                        'Quinoa with roasted vegetables, tahini drizzle, and herbs.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/quinoa,food?lock=7',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 8,
                    userId: 6,
                    name: 'Herb-Crusted Salmon',
                    description:
                        'Salmon fillet baked with fresh herbs and lemon zest.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/salmon,food?lock=8',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 9,
                    userId: 7,
                    name: 'Classic Margherita Pizza',
                    description:
                        'Thin crust pizza with tomato, fresh mozzarella, and basil.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/pizza,food?lock=9',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 17,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 10,
                    userId: 8,
                    name: 'Beef Pho',
                    description:
                        'Fragrant beef broth with rice noodles, brisket, and herbs.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/pho,food?lock=10',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 11,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 11,
                    userId: 9,
                    name: 'Chicken Tikka Masala',
                    description:
                        'Marinated chicken in a creamy spiced tomato sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/tikka,food?lock=11',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 11,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 12,
                    userId: 10,
                    name: 'Vegetarian Pad Thai',
                    description:
                        'Stir-fried rice noodles with tofu, tamarind, and peanuts.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/padthai,food?lock=12',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 12,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 13,
                    userId: 11,
                    name: 'Korean BBQ Beef (Bulgogi)',
                    description:
                        'Sweet-savory marinated beef grilled and served with rice.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/bulgogi,food?lock=13',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 7,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 14,
                    userId: 12,
                    name: 'Pesto Pasta with Cherry Tomatoes',
                    description:
                        'Basil pesto tossed with pasta and blistered cherry tomatoes.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/pesto,pasta?lock=14',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 4,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 15,
                    userId: 13,
                    name: 'Shakshuka',
                    description:
                        'Eggs poached in spiced tomato and pepper sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/shakshuka,food?lock=15',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 16,
                    userId: 14,
                    name: 'Mediterranean Mezze Platter',
                    description:
                        'Hummus, olives, roasted veggies, pita, and feta.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/mezze,food?lock=16',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 13,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 17,
                    userId: 15,
                    name: 'Teriyaki Chicken Rice Bowl',
                    description:
                        'Grilled chicken glazed with teriyaki over steamed rice.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/teriyaki,food?lock=17',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 18,
                    userId: 16,
                    name: 'BBQ Pulled Pork Sandwich',
                    description:
                        'Slow-cooked pulled pork with tangy BBQ sauce on brioche.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/pulledpork,food?lock=18',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 19,
                    userId: 17,
                    name: 'Greek Salad with Feta',
                    description:
                        'Crisp cucumbers, tomatoes, olives, feta, and oregano.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/greeksalad,food?lock=19',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 13,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 20,
                    userId: 18,
                    name: 'Miso Ramen with Tofu',
                    description:
                        'Umami-rich miso broth with ramen noodles and tofu.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/ramen,food?lock=20',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 12,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 21,
                    userId: 19,
                    name: 'Crispy Fish Tacos',
                    description:
                        'Beer-battered fish with slaw, lime crema, and salsa.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/fishtacos,food?lock=21',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 10,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 22,
                    userId: 20,
                    name: 'Butter Chicken',
                    description:
                        'Rich tomato-butter sauce with tender chicken pieces.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/butterchicken,food?lock=22',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 11,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 23,
                    userId: 21,
                    name: 'Veggie Stir-Fry with Cashews',
                    description:
                        'Colorful vegetables stir-fried with soy-garlic sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/stirfry,food?lock=23',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 24,
                    userId: 22,
                    name: 'Spaghetti Carbonara',
                    description:
                        'Classic Roman pasta with egg, pecorino, and pancetta.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/carbonara,food?lock=24',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 4,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 25,
                    userId: 23,
                    name: 'Avocado Toast with Poached Egg',
                    description:
                        'Sourdough topped with avocado mash and soft poached egg.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/avocado,toast?lock=25',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 26,
                    userId: 24,
                    name: 'Roasted Tomato Soup',
                    description:
                        'Oven-roasted tomatoes blended into a creamy soup.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/tomatosoup,food?lock=26',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 27,
                    userId: 25,
                    name: 'Caprese Salad',
                    description:
                        'Fresh mozzarella, tomatoes, basil, and balsamic glaze.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/caprese,food?lock=27',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 28,
                    userId: 26,
                    name: 'Thai Green Curry',
                    description:
                        'Green curry with coconut milk, chicken, and vegetables.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/greencurry,food?lock=28',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 9,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 29,
                    userId: 27,
                    name: 'Pumpkin Spice Pancakes',
                    description:
                        'Fluffy pancakes infused with pumpkin and warm spices.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/pancakes,food?lock=29',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 20,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 30,
                    userId: 28,
                    name: 'Sushi Bowl',
                    description:
                        'Deconstructed sushi with rice, salmon, avocado, and nori.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/sushi,food?lock=30',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 6,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 31,
                    userId: 29,
                    name: 'Mediterranean Grain Bowl',
                    description: 'Farro, roasted veggies, hummus, and olives.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/grainbowl,food?lock=31',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 13,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 32,
                    userId: 30,
                    name: 'Fried Rice with Shrimp',
                    description:
                        'Wok-fried rice with shrimp, peas, carrots, and egg.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/friedrice,food?lock=32',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 6,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 33,
                    userId: 4,
                    name: 'Baked Ziti',
                    description:
                        'Pasta baked with marinara, ricotta, and mozzarella.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/bakedziti,food?lock=33',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 4,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 34,
                    userId: 5,
                    name: 'Chicken Enchiladas',
                    description:
                        'Rolled tortillas filled with chicken and cheese, baked in sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/enchiladas,food?lock=34',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 10,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 35,
                    userId: 6,
                    name: 'Falafel Wrap',
                    description:
                        'Crispy falafel with tahini, pickles, and greens in pita.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/falafel,food?lock=35',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 8,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 36,
                    userId: 7,
                    name: 'Chili Con Carne',
                    description:
                        'Hearty beef chili with beans, tomatoes, and spices.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/chili,food?lock=36',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 37,
                    userId: 8,
                    name: 'Veggie Lasagna',
                    description:
                        'Layered pasta with ricotta, spinach, and roasted vegetables.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/lasagna,food?lock=37',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 38,
                    userId: 9,
                    name: 'Chicken Caesar Salad',
                    description:
                        'Romaine with grilled chicken, croutons, and parmesan.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/caesarsalad,food?lock=38',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 39,
                    userId: 10,
                    name: 'Beef Stir-Fry',
                    description:
                        'Quick beef stir-fry with bell peppers and soy garlic sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/stirfry,food?lock=39',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 40,
                    userId: 11,
                    name: 'Eggplant Parmesan',
                    description:
                        'Baked breaded eggplant with marinara and mozzarella.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/eggplant,food?lock=40',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 41,
                    userId: 12,
                    name: 'Stuffed Bell Peppers',
                    description:
                        'Bell peppers stuffed with spiced rice and beef.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/bellpepper,food?lock=41',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 42,
                    userId: 13,
                    name: 'Seafood Paella',
                    description:
                        'Saffron rice with mussels, shrimp, and chorizo.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/paella,food?lock=42',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 19,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 43,
                    userId: 14,
                    name: 'Mushroom Stroganoff',
                    description:
                        'Creamy mushroom sauce served over egg noodles.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/mushroom,food?lock=43',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 44,
                    userId: 15,
                    name: 'Lentil Dahl',
                    description: 'Spiced red lentil stew with coconut milk.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/lentilsoup,food?lock=44',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 8,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 45,
                    userId: 16,
                    name: 'Beef Bourguignon',
                    description:
                        'Braised beef in red wine with mushrooms and pearl onions.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/beefstew,food?lock=45',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 46,
                    userId: 17,
                    name: 'Chicken Piccata',
                    description: 'Pan-seared chicken with lemon-caper sauce.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/chicken,food?lock=46',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: null,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 47,
                    userId: 18,
                    name: 'Thai Mango Sticky Rice',
                    description:
                        'Sweet sticky rice with coconut milk and ripe mango.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/mango,food?lock=47',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 18,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 48,
                    userId: 19,
                    name: 'Chocolate Lava Cake',
                    description: 'Warm chocolate cake with molten center.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/chocolate,dessert?lock=48',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 15,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 49,
                    userId: 20,
                    name: 'Banana Bread',
                    description: 'Moist banana loaf with walnuts and cinnamon.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/bananabread,food?lock=49',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 20,
                    createdAt: now,
                    updatedAt: now
                },
                {
                    recipeId: 50,
                    userId: 21,
                    name: 'Tiramisu',
                    description:
                        'Coffee-soaked ladyfingers layered with mascarpone.',
                    thumbnailUrl:
                        'https://loremflickr.com/640/480/tiramisu,dessert?lock=50',
                    viewCount: 0,
                    likeCount: 0,
                    dislikeCount: 0,
                    linkedCourseId: 15,
                    createdAt: now,
                    updatedAt: now
                }
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('recipes', null, {});
    }
};

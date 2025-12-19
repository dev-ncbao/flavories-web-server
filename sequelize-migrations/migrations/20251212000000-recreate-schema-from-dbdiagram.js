'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // gender
        await queryInterface.createTable('gender', {
            genderId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // roles
        await queryInterface.createTable('roles', {
            roleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // units
        await queryInterface.createTable('units', {
            unitId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: { type: Sequelize.TEXT, allowNull: false },
            abbreviation: { type: Sequelize.TEXT, allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // users
        await queryInterface.createTable('users', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            genderId: { type: Sequelize.INTEGER, allowNull: true },
            roleId: { type: Sequelize.INTEGER, allowNull: true },
            firstName: { type: Sequelize.TEXT, allowNull: true },
            lastName: { type: Sequelize.TEXT, allowNull: true },
            username: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            password: { type: Sequelize.TEXT, allowNull: false },
            avatarUrl: { type: Sequelize.TEXT, allowNull: true },
            bio: { type: Sequelize.TEXT, allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // ingredients
        await queryInterface.createTable('ingredients', {
            ingredientId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            unitId: { type: Sequelize.INTEGER, allowNull: true },
            name: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // recipes
        await queryInterface.createTable('recipes', {
            recipeId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            name: { type: Sequelize.TEXT, allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: true },
            viewCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            likeCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            dislikeCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            commentCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            thumbnailUrl: { type: Sequelize.TEXT, allowNull: true },
            linkedCourseId: { type: Sequelize.INTEGER, allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // recipe_comments
        await queryInterface.createTable('recipe_comments', {
            recipeCommentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            recipeId: { type: Sequelize.INTEGER, allowNull: false },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            comment: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // courses
        await queryInterface.createTable('courses', {
            courseId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            videoUrl: { type: Sequelize.TEXT, allowNull: true },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            thumbnailUrl: { type: Sequelize.TEXT, allowNull: true },
            name: { type: Sequelize.TEXT, allowNull: false },
            viewCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            commentCount: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            rating: {
                type: Sequelize.DECIMAL(1, 1),
                allowNull: true,
                defaultValue: 0
            },
            price: {
                type: Sequelize.DECIMAL(10, 0),
                allowNull: true,
                defaultValue: 0
            },
            linkedRecipeId: { type: Sequelize.INTEGER, allowNull: true },
            description: { type: Sequelize.TEXT, allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // course_comments
        await queryInterface.createTable('course_comments', {
            courseCommentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            courseId: { type: Sequelize.INTEGER, allowNull: false },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            comment: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // reaction_types
        await queryInterface.createTable('reaction_types', {
            reactionTypeId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // course_ingredients
        await queryInterface.createTable('course_ingredients', {
            ingredientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            courseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            amount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // recipe_ingredients
        await queryInterface.createTable('recipe_ingredients', {
            ingredientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            amount: { type: Sequelize.DECIMAL(10, 2), allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // recipe_reactions
        await queryInterface.createTable('recipe_reactions', {
            reactionTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            recipeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // course_ratings
        await queryInterface.createTable('course_ratings', {
            courseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            rating: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // payments
        await queryInterface.createTable('payments', {
            paymentId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            courseId: { type: Sequelize.INTEGER, allowNull: false },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // recipe_steps
        await queryInterface.createTable('recipe_steps', {
            recipeStepId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            recipeId: { type: Sequelize.INTEGER, allowNull: false },
            stepNumber: { type: Sequelize.INTEGER, allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // course_steps
        await queryInterface.createTable('course_steps', {
            courseStepId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            courseId: { type: Sequelize.INTEGER, allowNull: false },
            stepNumber: { type: Sequelize.INTEGER, allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: false },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });

        // Foreign keys
        await queryInterface.addConstraint('users', {
            fields: ['genderId'],
            type: 'foreign key',
            name: 'fk_users_gender',
            references: { table: 'gender', field: 'genderId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
        await queryInterface.addConstraint('users', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_users_roles',
            references: { table: 'roles', field: 'roleId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
        await queryInterface.addConstraint('ingredients', {
            fields: ['unitId'],
            type: 'foreign key',
            name: 'fk_ingredients_units',
            references: { table: 'units', field: 'unitId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });
        await queryInterface.addConstraint('recipes', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_recipes_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('courses', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_courses_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_comments', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_recipe_comments_recipe',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_comments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_recipe_comments_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_comments', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_course_comments_course',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_comments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_course_comments_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_ingredients', {
            fields: ['ingredientId'],
            type: 'foreign key',
            name: 'fk_course_ingredients_ingredient',
            references: { table: 'ingredients', field: 'ingredientId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_ingredients', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_course_ingredients_course',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_ingredients', {
            fields: ['ingredientId'],
            type: 'foreign key',
            name: 'fk_recipe_ingredients_ingredient',
            references: { table: 'ingredients', field: 'ingredientId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_ingredients', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_recipe_ingredients_recipe',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_reactions', {
            fields: ['reactionTypeId'],
            type: 'foreign key',
            name: 'fk_recipe_reactions_type',
            references: { table: 'reaction_types', field: 'reactionTypeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_reactions', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_recipe_reactions_recipe',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_reactions', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_recipe_reactions_user',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_ratings', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_course_ratings_course',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_ratings', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_course_ratings_user',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('payments', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_payments_course',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('payments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_payments_user',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('recipe_steps', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_recipe_steps_recipe',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        await queryInterface.addConstraint('course_steps', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_course_steps_course',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
    },

    async down(queryInterface) {
        const drop = (table) => queryInterface.dropTable(table);
        await drop('course_steps');
        await drop('recipe_steps');
        await drop('payments');
        await drop('course_ratings');
        await drop('recipe_reactions');
        await drop('recipe_ingredients');
        await drop('course_ingredients');
        await drop('course_comments');
        await drop('recipe_comments');
        await drop('courses');
        await drop('recipes');
        await drop('ingredients');
        await drop('users');
        await drop('reaction_types');
        await drop('units');
        await drop('roles');
        await drop('gender');
    }
};

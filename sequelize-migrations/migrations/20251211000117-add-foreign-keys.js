'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        console.log(
            '[FK MIGRATION] Starting to add foreign key constraints...'
        );
        // users -> gender
        console.log('[FK MIGRATION] users -> gender');
        await queryInterface.addConstraint('users', {
            fields: ['genderId'],
            type: 'foreign key',
            name: 'fk_users_gender',
            references: { table: 'gender', field: 'genderId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        // users -> roles
        console.log('[FK MIGRATION] users -> roles');
        await queryInterface.addConstraint('users', {
            fields: ['roleId'],
            type: 'foreign key',
            name: 'fk_users_roles',
            references: { table: 'roles', field: 'roleId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        // ingredients -> units
        console.log('[FK MIGRATION] ingredients -> units');
        await queryInterface.addConstraint('ingredients', {
            fields: ['unitId'],
            type: 'foreign key',
            name: 'fk_ingredients_units',
            references: { table: 'units', field: 'unitId' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        });

        // recipes -> users
        console.log('[FK MIGRATION] recipes -> users');
        await queryInterface.addConstraint('recipes', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_recipes_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // courses -> users
        console.log('[FK MIGRATION] courses -> users');
        await queryInterface.addConstraint('courses', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_courses_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // comments -> users
        console.log('[FK MIGRATION] comments -> users');
        await queryInterface.addConstraint('comments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_comments_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // recipe_ingredient_mappings -> ingredients, recipes
        console.log('[FK MIGRATION] recipe_ingredient_mappings -> ingredients');
        await queryInterface.addConstraint('recipe_ingredient_mappings', {
            fields: ['ingredientId'],
            type: 'foreign key',
            name: 'fk_rim_ingredients',
            references: { table: 'ingredients', field: 'ingredientId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] recipe_ingredient_mappings -> recipes');
        await queryInterface.addConstraint('recipe_ingredient_mappings', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_rim_recipes',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // course_ingredient_mappings -> ingredients, courses
        console.log('[FK MIGRATION] course_ingredient_mappings -> ingredients');
        await queryInterface.addConstraint('course_ingredient_mappings', {
            fields: ['ingredientId'],
            type: 'foreign key',
            name: 'fk_cim_ingredients',
            references: { table: 'ingredients', field: 'ingredientId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] course_ingredient_mappings -> courses');
        await queryInterface.addConstraint('course_ingredient_mappings', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_cim_courses',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // recipe_course_mappings -> recipes, courses
        console.log('[FK MIGRATION] recipe_course_mappings -> recipes');
        await queryInterface.addConstraint('recipe_course_mappings', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_rcm_recipes',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] recipe_course_mappings -> courses');
        await queryInterface.addConstraint('recipe_course_mappings', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_rcm_courses',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // recipe_reaction_mappings -> reaction_types, recipes, users
        console.log(
            '[FK MIGRATION] recipe_reaction_mappings -> reaction_types'
        );
        await queryInterface.addConstraint('recipe_reaction_mappings', {
            fields: ['reactionTypeId'],
            type: 'foreign key',
            name: 'fk_rrm_reaction_types',
            references: { table: 'reaction_types', field: 'reactionTypeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] recipe_reaction_mappings -> recipes');
        await queryInterface.addConstraint('recipe_reaction_mappings', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_rrm_recipes',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] recipe_reaction_mappings -> users');
        await queryInterface.addConstraint('recipe_reaction_mappings', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_rrm_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // payments -> courses, users
        console.log('[FK MIGRATION] payments -> courses');
        await queryInterface.addConstraint('payments', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_payments_courses',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] payments -> users');
        await queryInterface.addConstraint('payments', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_payments_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // course_ratings -> courses, users
        console.log('[FK MIGRATION] course_ratings -> courses');
        await queryInterface.addConstraint('course_ratings', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_course_ratings_courses',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] course_ratings -> users');
        await queryInterface.addConstraint('course_ratings', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'fk_course_ratings_users',
            references: { table: 'users', field: 'userId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // course_comment_user_mappings -> courses, users
        console.log('[FK MIGRATION] course_comment_user_mappings -> courses');
        await queryInterface.addConstraint('course_comment_user_mappings', {
            fields: ['courseId'],
            type: 'foreign key',
            name: 'fk_ccum_courses',
            references: { table: 'courses', field: 'courseId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] course_comment_user_mappings -> comments');
        await queryInterface.addConstraint('course_comment_user_mappings', {
            fields: ['commentId'],
            type: 'foreign key',
            name: 'fk_ccum_comments',
            references: { table: 'comments', field: 'commentId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        // recipe_comment_user_mappings -> recipes, users
        console.log('[FK MIGRATION] recipe_comment_user_mappings -> recipes');
        await queryInterface.addConstraint('recipe_comment_user_mappings', {
            fields: ['recipeId'],
            type: 'foreign key',
            name: 'fk_rcum_recipes',
            references: { table: 'recipes', field: 'recipeId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] recipe_comment_user_mappings -> comments');
        await queryInterface.addConstraint('recipe_comment_user_mappings', {
            fields: ['commentId'],
            type: 'foreign key',
            name: 'fk_rcum_comments',
            references: { table: 'comments', field: 'commentId' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });
        console.log('[FK MIGRATION] All foreign key constraints added.');
    },

    async down(queryInterface) {
        console.log(
            '[FK MIGRATION] Starting to remove foreign key constraints...'
        );
        await queryInterface.removeConstraint(
            'recipe_comment_user_mappings',
            'fk_rcum_users'
        );
        await queryInterface.removeConstraint(
            'recipe_comment_user_mappings',
            'fk_rcum_recipes'
        );
        await queryInterface.removeConstraint(
            'course_comment_user_mappings',
            'fk_ccum_users'
        );
        await queryInterface.removeConstraint(
            'course_comment_user_mappings',
            'fk_ccum_courses'
        );
        await queryInterface.removeConstraint(
            'course_comment_user_mappings',
            'fk_ccum_comments'
        );
        await queryInterface.removeConstraint(
            'course_ratings',
            'fk_course_ratings_users'
        );
        await queryInterface.removeConstraint(
            'course_ratings',
            'fk_course_ratings_courses'
        );
        await queryInterface.removeConstraint('payments', 'fk_payments_users');
        await queryInterface.removeConstraint(
            'payments',
            'fk_payments_courses'
        );
        await queryInterface.removeConstraint(
            'recipe_reaction_mappings',
            'fk_rrm_users'
        );
        await queryInterface.removeConstraint(
            'recipe_reaction_mappings',
            'fk_rrm_recipes'
        );
        await queryInterface.removeConstraint(
            'recipe_reaction_mappings',
            'fk_rrm_reaction_types'
        );
        await queryInterface.removeConstraint(
            'recipe_course_mappings',
            'fk_rcm_courses'
        );
        await queryInterface.removeConstraint(
            'recipe_course_mappings',
            'fk_rcm_recipes'
        );
        await queryInterface.removeConstraint(
            'course_ingredient_mappings',
            'fk_cim_courses'
        );
        await queryInterface.removeConstraint(
            'course_ingredient_mappings',
            'fk_cim_ingredients'
        );
        await queryInterface.removeConstraint(
            'recipe_ingredient_mappings',
            'fk_rim_recipes'
        );
        await queryInterface.removeConstraint(
            'recipe_ingredient_mappings',
            'fk_rim_ingredients'
        );
        await queryInterface.removeConstraint('comments', 'fk_comments_users');
        await queryInterface.removeConstraint(
            'comments',
            'fk_comments_recipes'
        );
        await queryInterface.removeConstraint('recipes', 'fk_recipes_users');
        await queryInterface.removeConstraint(
            'ingredients',
            'fk_ingredients_units'
        );
        await queryInterface.removeConstraint('users', 'fk_users_roles');
        await queryInterface.removeConstraint('users', 'fk_users_gender');
        await queryInterface.removeConstraint(
            'recipe_comment_user_mappings',
            'fk_rcum_comments'
        );
        console.log('[FK MIGRATION] All foreign key constraints removed.');
    }
};

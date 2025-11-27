'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('media_types', [
      { id: 1, name: 'image', description: 'Image file', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'video', description: 'Video file', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'audio', description: 'Audio file', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'document', description: 'Document file', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('media_types', null, {});
    await queryInterface.sequelize.query('ALTER TABLE media_types AUTO_INCREMENT = 1;');
  }
};

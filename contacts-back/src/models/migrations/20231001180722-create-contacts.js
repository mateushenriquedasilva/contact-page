'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      contact_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      contact_name: {
        type: Sequelize.STRING(100),
      },
      contact_email: {
        type: Sequelize.STRING(255),
      },
      contact_mobile: {
        type: Sequelize.STRING(14),
      },
      contact_phone: {
        type: Sequelize.STRING(14),
      },
      contact_is_favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      contact_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      contact_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  },
};;

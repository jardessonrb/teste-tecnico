'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicle", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        field: "id_vehicle"
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kilometer: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chassis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      purchasePrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vehicle');
  }
};

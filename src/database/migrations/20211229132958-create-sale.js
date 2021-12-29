'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        field: "id_sale"
      },
      valueSale: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "value_sale"
      },
      clientId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        field: "id_client"
      },
      emploeeId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        field: "id_emploee"
      },
      vehicleId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        field: "id_vehicle"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};

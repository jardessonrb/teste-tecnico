'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reserve_vehicles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
        field: "id_sale"
      },
      valueReserve: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: "value_reserve"
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
      reserveExpiration: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('reserve_vehicles');
  }
};

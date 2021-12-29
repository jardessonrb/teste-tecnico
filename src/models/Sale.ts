import { Optional, Model, DataTypes } from "sequelize";
import SaleAttribute from "./models-interfaces/SaleAttribute";
import sequelize from '../database/connection';
import { Vehicle } from "./Vehicle";
import { Emploee } from "./Emploee";
import { Client } from "./Client";

interface SaleCreationAttributes extends Optional<SaleAttribute, "id"> {}

export class Sale extends Model<SaleAttribute, SaleCreationAttributes> implements SaleAttribute{
  id!: string;
  valueSale!: number;
  idClient!: string;
  idVehicle!: string;
  idEmploee!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

Sale.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: "id_sale"
  },
  valueSale: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "value_sale"
  },
  idClient: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    field: "id_client"
  },
  idEmploee: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    field: "id_emploee"
  },
  idVehicle: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    field: "id_vehicle"
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {sequelize, tableName: "sales"});

Sale.hasOne(Vehicle, {foreignKey:{name: "id_vehicle"}, keyType: DataTypes.UUIDV4});
Vehicle.belongsTo(Sale);

Sale.hasMany(Emploee, {foreignKey: {name: "id_emploee"}, keyType: DataTypes.UUIDV4});
Emploee.belongsTo(Sale);

Sale.hasMany(Client, {foreignKey: {name: "id_client"}, keyType: DataTypes.UUIDV4});
Client.belongsTo(Sale);


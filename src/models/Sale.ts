import { Optional, Model, DataTypes } from "sequelize";
import SaleAttribute from "./models-interfaces/SaleAttribute";
import sequelize from '../database/connection';
import { Vehicle } from "./Vehicle";
import { Client } from "./Client";
import { Emploee } from "./Emploee";

interface SaleCreationAttributes extends Optional<SaleAttribute, "id"> {}

export class Sale extends Model<SaleAttribute, SaleCreationAttributes> implements SaleAttribute{
  id!: string;
  valueSale!: number;
  clientId!: string;
  vehicleId!: string;
  emploeeId!: string;

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
  clientId: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    field: "id_client"
  },
  emploeeId: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    field: "id_emploee"
  },
  vehicleId: {
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

Sale.belongsTo(Vehicle, {foreignKey: "id_vehicle"})
Sale.belongsTo(Client, {foreignKey: "id_client"})
Sale.belongsTo(Emploee, {foreignKey: "id_emploee"})

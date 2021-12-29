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

Sale.hasOne(Vehicle, {foreignKey:{name: "id_vehicle"}, keyType: DataTypes.UUIDV4});

Sale.hasMany(Emploee, {foreignKey: {name: "id_emploee"}, keyType: DataTypes.UUIDV4});

Sale.hasMany(Client, {foreignKey: {name: "id_client"}, keyType: DataTypes.UUIDV4});


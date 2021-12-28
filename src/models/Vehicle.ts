import { Optional, Model, DataTypes } from "sequelize";
import sequelize from "../database/connection";
import VehicleAttribute from "./models-interfaces/VehicleAttribute";

interface VehicleCreationAttributes extends Optional<VehicleAttribute, "id"> {};

export class Vehicle extends Model<VehicleAttribute, VehicleCreationAttributes> implements VehicleAttribute{
  id!: string;
  brand!: string;
  model!: string;
  year!: number;
  kilometer!: number;
  color!: string;
  chassis!: string;
  purchasePrice!: number;
  type!: string;
  status!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

Vehicle.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
    field: "id_vehicle"
  },
  brand: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  kilometer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  chassis: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  purchasePrice: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  type: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: new DataTypes.STRING,
    allowNull: false
  }
},{sequelize, tableName: "vehicle"});

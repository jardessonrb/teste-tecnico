import { Model, Optional, DataTypes} from "sequelize";
import ReserveVehicleAttribute from "./models-interfaces/ReserveVehicleAttribute";
import sequelize from '../database/connection';
import { Vehicle } from "./Vehicle";
import { Client } from "./Client";
import { Emploee } from "./Emploee";

interface ReserveVehicleCreationAttributes extends Optional<ReserveVehicleAttribute, "id"> {}

export class ReserveVehicle extends Model<ReserveVehicleAttribute, ReserveVehicleCreationAttributes> implements ReserveVehicleAttribute {
  id!: string;
  valueReserve!: number;
  clientId!: string;
  vehicleId!: string;
  emploeeId!: string;
  reserveExpiration!: Date;
  status!: string

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

ReserveVehicle.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: "id_reserve"
  },
  valueReserve: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "value_reserve"
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
  reserveExpiration: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: new DataTypes.STRING(),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
    allowNull: false
  }
}, {sequelize, tableName: "reserve_vehicles"});

ReserveVehicle.belongsTo(Vehicle, {foreignKey: "id_vehicle"})
ReserveVehicle.belongsTo(Client, {foreignKey: "id_client"})
ReserveVehicle.belongsTo(Emploee, {foreignKey: "id_emploee"})

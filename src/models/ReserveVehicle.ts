import { Model, Optional, DataTypes} from "sequelize";
import ReserveVehicleAttribute from "./models-interfaces/ReserveVehicleAttribute";
import sequelize from '../database/connection';

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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
    field: "id_sale"
  },
  valueReserve: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: "value_reserve"
  },
  clientId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    field: "id_client"
  },
  emploeeId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    field: "id_emploee"
  },
  vehicleId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
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
}, {sequelize, tableName: "reserve-vehicles"});

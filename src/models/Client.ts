import { Optional, Model, DataTypes } from "sequelize";
import ClientAttribute from "./models-interfaces/ClientAttribute";
import sequelize from '../database/connection';

interface ClientCreationAttributes extends Optional<ClientAttribute, "id"> {}

export class Client extends Model<ClientAttribute, ClientCreationAttributes> implements ClientAttribute {
  id!: string;
  name!: string;
  email!: string;
  avatar: string;
  cpf!: string;
  fone!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

Client.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: "id_client"
  },
  name: {
    type: new DataTypes.STRING(),
    allowNull: false
  },
  cpf: {
    type: new DataTypes.STRING(12),
    unique: true,
    allowNull: false
  },
  email:{
    type: new DataTypes.STRING(),
    allowNull: false,
    unique: true
  },
  avatar: {
    type: new DataTypes.STRING(),
    allowNull: true
  },
  fone: {
    type: new DataTypes.STRING(),
    allowNull: true
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
}, {sequelize, tableName: "clients"});

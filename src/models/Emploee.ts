import { DataTypes, Model, Optional } from "sequelize";
import EmploeeAttribute from "./models-interfaces/EmploeeAttribute";
import sequelize from '../database/connection';

interface EmploeeCreationAttributes extends Optional<EmploeeAttribute, "id"> {}

export class Emploee extends Model<EmploeeAttribute, EmploeeCreationAttributes> implements EmploeeAttribute {
  id!: string;
  name!: string;
  cpf!: string;
  email!: string;
  password!: string
  avatar: string;
  biography!: string;
  type!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

Emploee.init({
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    field: "id_emploee"
  },
  name: {
    type: new DataTypes.STRING(),
    allowNull: false
  },
  cpf: {
    type: new DataTypes.STRING(12),
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
  biography: {
    type: new DataTypes.STRING(),
    allowNull: true
  },
  password: {
    type: new DataTypes.STRING(),
    allowNull: true
  },
  type: {
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

}, {sequelize, tableName: "emploees"});



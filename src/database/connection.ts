import 'dotenv/config';
import { Sequelize } from 'sequelize';

const databaseUrl: string = process.env.DATABASE_URL;
const sequelizeConnection = new Sequelize(databaseUrl);

export default sequelizeConnection;

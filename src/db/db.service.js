import { Sequelize } from "sequelize";
import { configPgDb } from "../config/db.config.js";

const sequelizePg = new Sequelize(configPgDb.url, {
  logging: console.log,
  native: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: configPgDb.ssl,
  },
});

export const initPgDb = async () => {
  try {
    await sequelizePg.authenticate();
    return await sequelizePg.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
};
export default sequelizePg;
